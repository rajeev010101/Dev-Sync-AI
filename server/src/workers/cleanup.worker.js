import BaseWorker from "./base.worker.js";
import CleanupJobs from "../jobs/cleanup/index.js";

export default new BaseWorker(
  "cleanup",
  async (job) => {
    const handler = CleanupJobs[job.name];

    if (!handler) {
      throw new Error(
        `Unknown Cleanup Job: ${job.name}`
      );
    }

    console.log(
      `Processing Cleanup Job: ${job.name}`
    );

    return handler(job);
  },
  {
    concurrency: 2,
  }
);