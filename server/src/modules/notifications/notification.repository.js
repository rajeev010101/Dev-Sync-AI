import Notification from "../../models/Notification.js";

class NotificationRepository {
  async create(data) {
    return Notification.create(data);
  }

  async getUserNotifications(
    userId
  ) {
    return Notification.find({
      user: userId
    }).sort({
      createdAt: -1
    });
  }

  async unreadCount(userId) {
    return Notification.countDocuments({
      user: userId,
      read: false
    });
  }

  async markRead(
    notificationId,
    userId
  ) {
    return Notification.findOneAndUpdate(
      {
        _id: notificationId,
        user: userId
      },
      {
        read: true
      },
      {
        new: true
      }
    );
  }

  async markAllRead(
    userId
  ) {
    return Notification.updateMany(
      {
        user: userId,
        read: false
      },
      {
        read: true
      }
    );
  }
}

export default new NotificationRepository();