import cleanupRefreshTokensJob from "./cleanup-refresh-tokens.job.js";
import cleanupPasswordResetJob from "./cleanup-password-reset.job.js";
import cleanupUploadsJob from "./cleanup-uploads.job.js";
import cleanupAnalyticsJob from "./cleanup-analytics.job.js";
import cleanupLogsJob from "./cleanup-logs.job.js";

const CleanupJobs = {
  "cleanup.refresh-tokens": cleanupRefreshTokensJob,
  "cleanup.password-reset": cleanupPasswordResetJob,
  "cleanup.uploads": cleanupUploadsJob,
  "cleanup.analytics": cleanupAnalyticsJob,
  "cleanup.logs": cleanupLogsJob,
};

export default CleanupJobs;