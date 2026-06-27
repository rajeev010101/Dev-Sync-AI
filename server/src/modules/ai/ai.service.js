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

    const aiMessage =
      response.choices[0]
        .message.content;

    await AIRepository.createMessage({
      chat: chatId,
      role: "assistant",
      content: aiMessage
    });

    return aiMessage;
  }
}

export default new AIService();