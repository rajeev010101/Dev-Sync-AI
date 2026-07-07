import Notification from "../models/Notification.js";

class NotificationService {
  /**
   * Create a notification
   */
  async create(data) {
    const notification = await Notification.create({
      user: data.userId,
      title: data.title,
      message: data.message,
      type: data.type || "info",
      metadata: data.metadata || {},
      isRead: false,
    });

    return notification;
  }

  /**
   * Create notification and emit via Socket.IO
   */
  async send(data, io = null) {
    const notification = await this.create(data);

    if (io && data.userId) {
      io.to(`user:${data.userId}`).emit(
        "notification:new",
        notification
      );
    }

    return notification;
  }

  /**
   * Broadcast notification
   */
  async broadcast(data, io = null) {
    const notification = {
      title: data.title,
      message: data.message,
      type: data.type || "info",
      metadata: data.metadata || {},
      createdAt: new Date(),
    };

    if (io) {
      io.emit("notification:broadcast", notification);
    }

    return notification;
  }

  /**
   * Get notifications
   */
  async getUserNotifications(userId) {
    return Notification.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId) {
    return Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId) {
    return Notification.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );
  }

  /**
   * Delete notification
   */
  async delete(notificationId) {
    return Notification.findByIdAndDelete(
      notificationId
    );
  }

  /**
   * Delete all read notifications
   */
  async cleanupReadNotifications() {
    return Notification.deleteMany({
      isRead: true,
    });
  }

  /**
   * Count unread notifications
   */
  async getUnreadCount(userId) {
    return Notification.countDocuments({
      user: userId,
      isRead: false,
    });
  }
}

export default new NotificationService();