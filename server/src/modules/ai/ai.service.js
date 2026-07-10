import openai from "../../config/openai.js";

import AIRepository from "./ai.repository.js";

import AIUsage from "../../models/AIUsage.js";

import User from "../../models/User.js";

import {
  PROMPTS
} from "./prompt.templates.js";

import {
  SUBSCRIPTION_PLANS
} from "../../constants/subscription.js";

import {
  checkUsageLimit
} from "./ai.analytics.js";
import CostService from "./analytics/cost.service.js";
import NotFoundError from "../../utils/errors/NotFoundError.js";

class AIService {
  async generateContent(
    userId,
    type,
    topic
  ) {
    const user =
      await User.findById(userId);

    let limit = 20;

    if (
      user.plan ===
      SUBSCRIPTION_PLANS.PRO
    ) {
      limit = 500;
    }

    if (
      user.plan ===
      SUBSCRIPTION_PLANS.ENTERPRISE
    ) {
      limit = 5000;
    }

    const allowed =
      await checkUsageLimit(
        userId,
        limit
      );

    if (!allowed) {
      throw new Error(
        "Daily AI limit reached"
      );
    }

    const prompt =
      PROMPTS[type](topic);

    const response =
      await openai.chat.completions.create(
        {
          model:
            process.env.OPENAI_MODEL,

          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        }
      );

    await AIUsage.create({
      user: userId,

      model:
        process.env.OPENAI_MODEL,

      promptTokens:
        response.usage.prompt_tokens,

      completionTokens:
        response.usage
          .completion_tokens,

      totalTokens:
        response.usage.total_tokens,

      feature: type
    });

    return response.choices[0]
      .message.content;
  }

  async createChat(
    userId,
    title
  ) {
    return AIRepository.createChat({
      user: userId,
      title
    });
  }

  async getChats(userId) {
    return AIRepository.getUserChats(userId);
  }

  async getMessages(userId, chatId) {
    const chat = await AIRepository.validateOwnership(chatId, userId);
    if (!chat) throw new NotFoundError("Chat not found");
    return AIRepository.getChatMessages(chatId);
  }

  async renameChat(userId, chatId, title) {
    const chat = await AIRepository.updateChatTitle(chatId, userId, title);
    if (!chat) throw new NotFoundError("Chat not found");
    return chat;
  }

  async deleteChat(userId, chatId) {
    const chat = await AIRepository.deleteChat(chatId, userId);
    if (!chat) throw new NotFoundError("Chat not found");
  }

  async sendMessage(
    userId,
    chatId,
    content
  ) {

     const chat =
    await AIRepository.validateOwnership(
      chatId,
      userId
    );

  if (!chat) {
    throw new Error(
      "Unauthorized chat access"
    );
  }


    const messages =
      await AIRepository.getChatMessages(
        chatId
      );

    const history =
      messages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

    await AIRepository.createMessage({
      chat: chatId,
      role: "user",
      content
    });

    const response =
      await openai.chat.completions.create(
        {
          model:
            process.env.OPENAI_MODEL,

          messages: [
            ...history,
            {
              role: "user",
              content
            }
          ]
        }
      );

    const aiMessage = response.choices[0].message.content;
    const usage = this.createUsage(userId, response.usage, "chat");

    await usage;

    await AIRepository.createMessage({
      chat: chatId,
      role: "assistant",
      content: aiMessage
    });

    return {
      message: aiMessage,
      usage: this.formatUsage(response.usage)
    };
  }

  async streamMessage(userId, chatId, content, onChunk) {
    const chat = await AIRepository.validateOwnership(chatId, userId);
    if (!chat) throw new NotFoundError("Chat not found");

    const messages = await AIRepository.getChatMessages(chatId);
    await AIRepository.createMessage({ chat: chatId, role: "user", content });

    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [...messages.map((message) => ({ role: message.role, content: message.content })), { role: "user", content }],
      stream: true,
      stream_options: { include_usage: true }
    });

    let response = "";
    let streamUsage;
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        response += text;
        onChunk(text);
      }
      if (chunk.usage) streamUsage = chunk.usage;
    }

    await AIRepository.createMessage({ chat: chatId, role: "assistant", content: response });
    await this.createUsage(userId, streamUsage, "chat");
    return { message: response, usage: this.formatUsage(streamUsage) };
  }

  async getUsage(userId) {
    const records = await AIUsage.find({ user: userId }).sort({ createdAt: -1 }).limit(50);
    const totals = records.reduce((result, record) => ({
      promptTokens: result.promptTokens + (record.promptTokens || 0),
      completionTokens: result.completionTokens + (record.completionTokens || 0),
      totalTokens: result.totalTokens + (record.totalTokens || 0),
    }), { promptTokens: 0, completionTokens: 0, totalTokens: 0 });
    return { ...totals, cost: CostService.calculate(totals.promptTokens, totals.completionTokens), records };
  }

  async createUsage(userId, usage, feature) {
    if (!usage) return null;
    return AIUsage.create({ user: userId, model: process.env.OPENAI_MODEL, promptTokens: usage.prompt_tokens || 0, completionTokens: usage.completion_tokens || 0, totalTokens: usage.total_tokens || 0, feature });
  }

  formatUsage(usage) {
    if (!usage) return null;
    const promptTokens = usage.prompt_tokens || 0;
    const completionTokens = usage.completion_tokens || 0;
    return { model: process.env.OPENAI_MODEL, promptTokens, completionTokens, totalTokens: usage.total_tokens || 0, cost: CostService.calculate(promptTokens, completionTokens) };
  }
}

export default new AIService();
