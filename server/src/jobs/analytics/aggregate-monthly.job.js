import AnalyticsService from "../../services/analytics.service.js";

export default async function aggregateMonthlyJob(job) {
  const now = new Date();

  const {
    year = now.getFullYear(),
    month = now.getMonth() + 1,
  } = job.data || {};

  return AnalyticsService.aggregateMonthly(
    year,
    month
  );
}