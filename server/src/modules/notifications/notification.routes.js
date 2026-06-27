import { Router }
from "express";

import authenticate
from "../../middlewares/authenticate.js";

import NotificationController
from "./notification.controller.js";

const router =
  Router();

router.get(
  "/",
  authenticate,
  NotificationController.getNotifications
);

router.get(
  "/unread-count",
  authenticate,
  NotificationController.unreadCount
);

router.patch(
  "/:id/read",
  authenticate,
  NotificationController.markRead
);

router.patch(
  "/mark-all-read",
  authenticate,
  NotificationController.markAllRead
);

export default router;