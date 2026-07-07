import NotificationService from "../../services/notification.service.js";

export default async function cleanupNotificationsJob() {
  return NotificationService.cleanupReadNotifications();
}