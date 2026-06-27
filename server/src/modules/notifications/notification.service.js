import NotificationRepository
from "./notification.repository.js";

class NotificationService {
  async create(
    io,
    data
  ) {
    const notification =
      await NotificationRepository.create(
        data
      );

    io.to(
      data.user.toString()
    ).emit(
      "notification:new",
      notification
    );

    return notification;
  }

  async getUserNotifications(
    userId
  ) {
    return NotificationRepository.getUserNotifications(
      userId
    );
  }

  async unreadCount(
    userId
  ) {
    return NotificationRepository.unreadCount(
      userId
    );
  }

  async markRead(
    id,
    userId
  ) {
    return NotificationRepository.markRead(
      id,
      userId
    );
  }

  async markAllRead(
    userId
  ) {
    return NotificationRepository.markAllRead(
      userId
    );
  }
}

export default new NotificationService();