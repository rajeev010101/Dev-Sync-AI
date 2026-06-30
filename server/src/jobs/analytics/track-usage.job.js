import AnalyticsService from "../../services/analytics.service.js";

export default async function trackUsageJob(job) {
  return AnalyticsService.trackUsage(job.data);
}