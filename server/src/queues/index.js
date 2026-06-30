import QueueFactory from "./queue.factory.js";

export const AI_QUEUE =
  QueueFactory.create("ai");

export const EMAIL_QUEUE =
  QueueFactory.create("email");

export const NOTIFICATION_QUEUE =
  QueueFactory.create("notification");

export const ANALYTICS_QUEUE =
  QueueFactory.create("analytics");

export const UPLOAD_QUEUE =
  QueueFactory.create("upload");

export const CLEANUP_QUEUE =
  QueueFactory.create("cleanup");