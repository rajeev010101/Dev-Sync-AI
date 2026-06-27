import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";

import UserController from "./user.controller.js";

const router = Router();

router.get(
  "/profile",
  authenticate,
  UserController.getProfile
);

router.put(
  "/profile",
  authenticate,
  UserController.updateProfile
);

export default router;