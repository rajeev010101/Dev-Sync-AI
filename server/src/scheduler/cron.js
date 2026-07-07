import { registerCleanupCron } from "./cleanup.cron.js";
import { registerAnalyticsCron } from "./analytics.cron.js";
import { registerSubscriptionCron } from "./subscription.cron.js";

export function startSchedulers() {
  registerCleanupCron();
  registerAnalyticsCron();
  registerSubscriptionCron();

  console.log("All schedulers started.");
}