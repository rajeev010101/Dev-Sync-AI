import cron from "node-cron";

import AnalyticsQueue from "../queues/analytics.queue.js";

export function registerAnalyticsCron() {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running analytics aggregation...");

    await AnalyticsQueue.add(
      "analytics.daily",
      {}
    );
  });

  cron.schedule("0 1 1 * *", async () => {
    const now = new Date();

    await AnalyticsQueue.add(
      "analytics.monthly",
      {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      }
    );
  });
}