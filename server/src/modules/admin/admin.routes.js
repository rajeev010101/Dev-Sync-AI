import { Router } from "express";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";

import { ROLES } from "../../constants/roles.js";

import AdminController from "./admin.controller.js";

const router = Router();

router.get(
  "/users",
  authenticate,
  authorize(
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ),
  AdminController.getUsers
);

export default router;