import trackUsageJob from "./track-usage.job.js";
import aggregateDailyJob from "./aggregate-daily.job.js";
import aggregateMonthlyJob from "./aggregate-monthly.job.js";
import calculateCostJob from "./calculate-cost.job.js";

const AnalyticsJobs = {
  "analytics.track": trackUsageJob,
  "analytics.daily": aggregateDailyJob,
  "analytics.monthly": aggregateMonthlyJob,
  "analytics.cost": calculateCostJob,
};

export default AnalyticsJobs;