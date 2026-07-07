import NotificationService from "../../services/notification.service.js";

export default async function broadcastJob(job) {
  const {
    title,
    message,
    type,
    metadata,
    io,
  } = job.data;

  return NotificationService.broadcast(
    {
      title,
      message,
      type,
      metadata,
    },
    io
  );
}