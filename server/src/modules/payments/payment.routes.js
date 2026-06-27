import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";

import PaymentController from "./payment.controller.js";

const router = Router();

router.post(
  "/checkout",
  authenticate,
  PaymentController.createCheckout
);

router.post(
  "/billing-portal",
  authenticate,
  PaymentController.billingPortal
);

export default router;