import { registerCleanupCron } from "./cleanup.cron.js";
import { registerAnalyticsCron } from "./analytics.cron.js";
import { registerSubscriptionCron } from "./subscription.cron.js";

let schedulerStarted = false;

export function startSchedulers() {
  if (schedulerStarted) {
    console.log("⚠️ Schedulers are already running.");
    return;
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🚀 Starting Background Schedulers...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  registerCleanupCron();
  registerAnalyticsCron();
  registerSubscriptionCron();

  schedulerStarted = true;

  console.log("✅ Cleanup Scheduler Started");
  console.log("✅ Analytics Scheduler Started");
  console.log("✅ Subscription Scheduler Started");
  console.log("🎉 All Background Schedulers Started");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

export default startSchedulers;