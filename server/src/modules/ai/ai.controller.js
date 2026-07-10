import AIService from "./ai.service.js";
import { initSSE } from "../../streaming/sse.service.js";

class AIController {
  createChat = async (req, res, next) => {
    try {
      const result = await AIService.createChat(
        req.user.userId,
        req.body.title
      );

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req, res, next) => {
    try {
      const result = await AIService.sendMessage(
        req.user.userId,
        req.body.chatId,
        req.body.message
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  generateContent = async (req, res, next) => {
    try {
      const result = await AIService.generateContent(
        req.user.userId,
        req.body.type,
        req.body.topic
      );

      res.json({
        content: result,
      });
    } catch (error) {
      next(error);
    }
  };

  streamResponse = async (req, res, next) => {
    try {
      const { chatId, message } = req.body;
      initSSE(res);
      const result = await AIService.streamMessage(req.user.userId, chatId, message, (text) => res.write(`data: ${JSON.stringify({ type: "chunk", text })}\n\n`));
      res.write(`data: ${JSON.stringify({ type: "done", ...result })}\n\n`);
      res.end();
    } catch (error) {
      if (!res.headersSent) next(error);
      else res.end();
    }
  };

  getChats = async (req, res, next) => { try { res.json(await AIService.getChats(req.user.userId)); } catch (error) { next(error); } };
  getMessages = async (req, res, next) => { try { res.json(await AIService.getMessages(req.user.userId, req.params.chatId)); } catch (error) { next(error); } };
  renameChat = async (req, res, next) => { try { res.json(await AIService.renameChat(req.user.userId, req.params.chatId, req.body.title)); } catch (error) { next(error); } };
  deleteChat = async (req, res, next) => { try { await AIService.deleteChat(req.user.userId, req.params.chatId); res.status(204).end(); } catch (error) { next(error); } };
  getUsage = async (req, res, next) => { try { res.json(await AIService.getUsage(req.user.userId)); } catch (error) { next(error); } };
}

export default new AIController();
