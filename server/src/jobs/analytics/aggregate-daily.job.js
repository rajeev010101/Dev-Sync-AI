import AnalyticsService from "../../services/analytics.service.js";

export default async function aggregateDailyJob(job) {
  const { date } = job.data || {};

  return AnalyticsService.aggregateDaily(
    date ? new Date(date) : new Date()
  );
}