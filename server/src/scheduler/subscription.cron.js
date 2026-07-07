import cron from "node-cron";

import NotificationQueue from "../queues/notification.queue.js";

export function registerSubscriptionCron() {
  cron.schedule("0 9 * * *", async () => {
    console.log("Checking subscriptions...");

    await NotificationQueue.add(
      "notification.broadcast",
      {
        title: "Subscription Check",
        message:
          "Daily subscription monitoring executed.",
        type: "info",
      }
    );
  });
}