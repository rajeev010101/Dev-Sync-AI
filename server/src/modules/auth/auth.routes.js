import { Router } from "express";

import AuthController from "./auth.controller.js";

import validate from "../../middlewares/validate.js";

import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validate,
  AuthController.register
);

router.post(
  "/login",
  loginValidation,
  validate,
  AuthController.login
);

router.post(
  "/refresh",
  AuthController.refresh
);

router.post(
  "/logout",
  AuthController.logout
);

router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  AuthController.forgotPassword
);

router.post(
  "/reset-password",
  resetPasswordValidation,
  validate,
  AuthController.resetPassword
);

export default router;