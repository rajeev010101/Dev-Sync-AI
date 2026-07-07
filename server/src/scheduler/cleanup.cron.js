import cron from "node-cron";

import CleanupQueue from "../queues/cleanup.queue.js";

export function registerCleanupCron() {
  cron.schedule("0 2 * * *", async () => {
    console.log("Running cleanup cron...");

    await CleanupQueue.add(
      "cleanup.refresh-tokens",
      {}
    );

    await CleanupQueue.add(
      "cleanup.password-reset",
      {}
    );

    await CleanupQueue.add(
      "cleanup.analytics",
      {
        olderThanDays: 365,
      }
    );

    await CleanupQueue.add(
      "cleanup.logs",
      {
        olderThanDays: 30,
      }
    );
  });
}