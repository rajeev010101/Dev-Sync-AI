import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";

import AIController from "./ai.controller.js";

const router = Router();

router.post(
  "/chat/create",
  authenticate,
  AIController.createChat
);

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