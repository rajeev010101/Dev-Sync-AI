import sendNotificationJob from "./send-notification.job.js";
import broadcastJob from "./broadcast.job.js";
import cleanupNotificationsJob from "./cleanup-notifications.job.js";

const NotificationJobs = {
  "notification.send": sendNotificationJob,
  "notification.broadcast": broadcastJob,
  "notification.cleanup": cleanupNotificationsJob,
};

export default NotificationJobs;