import AnalyticsService from "../../services/analytics.service.js";

export default async function calculateCostJob(job) {
  const { userId = null } = job.data || {};

  return AnalyticsService.calculateCost(userId);
}