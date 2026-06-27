import AIService from "./ai.service.js";

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

      res.json({
        response: result,
      });
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
      const { message } = req.body;

      const result = await AIService.streamResponse(
        req.user.userId,
        message
      );

      res.json({
        response: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AIController();