import NotificationService
from "./notification.service.js";

class NotificationController {
  getNotifications =
    async (
      req,
      res,
      next
    ) => {
      try {
        const notifications =
          await NotificationService.getUserNotifications(
            req.user.userId
          );

        res.json(
          notifications
        );
      } catch (
        error
      ) {
        next(error);
      }
    };

  unreadCount =
    async (
      req,
      res,
      next
    ) => {
      try {
        const count =
          await NotificationService.unreadCount(
            req.user.userId
          );

        res.json({
          count
        });
      } catch (
        error
      ) {
        next(error);
      }
    };

  markRead =
    async (
      req,
      res,
      next
    ) => {
      try {
        const notification =
          await NotificationService.markRead(
            req.params.id,
            req.user.userId
          );

        res.json(
          notification
        );
      } catch (
        error
      ) {
        next(error);
      }
    };

  markAllRead =
    async (
      req,
      res,
      next
    ) => {
      try {
        await NotificationService.markAllRead(
          req.user.userId
        );

        res.json({
          success: true
        });
      } catch (
        error
      ) {
        next(error);
      }
    };
}

export default new NotificationController();