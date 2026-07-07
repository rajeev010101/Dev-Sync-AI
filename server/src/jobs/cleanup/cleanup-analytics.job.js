import AIUsage from "../../models/AIUsage.js";

export default async function cleanupAnalyticsJob(job) {
  const { olderThanDays = 365 } = job.data || {};

  const cutoff = new Date();

  cutoff.setDate(
    cutoff.getDate() - olderThanDays
  );

  const result = await AIUsage.deleteMany({
    createdAt: {
      $lt: cutoff,
    },
  });

  return {
    deletedCount: result.deletedCount,
  };
}