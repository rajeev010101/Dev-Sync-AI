import { Router } from "express";

import express from "express";

import WebhookController from "../modules/payments/webhook.controller.js";

const router = Router();

router.post(
  "/stripe",
  express.raw({
    type:
      "application/json"
  }),
  WebhookController.handleWebhook
);

export default router;