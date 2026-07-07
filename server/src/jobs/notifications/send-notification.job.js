import NotificationService from "../../services/notification.service.js";

export default async function sendNotificationJob(job) {
  const {
    userId,
    title,
    message,
    type,
    metadata,
    io,
  } = job.data;

  return NotificationService.send(
    {
      userId,
      title,
      message,
      type,
      metadata,
    },
    io
  );
}