import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";

import AIController from "./ai.controller.js";

const router = Router();

router.post(
  "/chat/create",
  authenticate,
  AIController.createChat
);

router.get("/chats", authenticate, AIController.getChats);
router.get("/chat/:chatId/messages", authenticate, AIController.getMessages);
router.patch("/chat/:chatId", authenticate, AIController.renameChat);
router.delete("/chat/:chatId", authenticate, AIController.deleteChat);
router.get("/usage", authenticate, AIController.getUsage);

router.post(
  "/chat/message",
  authenticate,
  AIController.sendMessage
);

router.post(
  "/generate",
  authenticate,
  AIController.generateContent
);

router.post(
  "/stream",
  authenticate,
  AIController.streamResponse
);

export default router;
