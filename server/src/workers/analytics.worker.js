import BaseWorker from "./base.worker.js";
import AnalyticsJobs from "../jobs/analytics/index.js";

export default new BaseWorker(
  "analytics",

  async (job) => {
    const handler = AnalyticsJobs[job.name];

    if (!handler) {
      throw new Error(
        `Unknown Analytics Job: ${job.name}`
      );
    }

    console.log(
      `Processing Analytics Job: ${job.name}`
    );

    return handler(job);
  },

  {
    concurrency: 5,
  }
);