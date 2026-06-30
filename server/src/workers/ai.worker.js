import BaseWorker from "./base.worker.js";
import AIJobs from "../jobs/ai/index.js";

export default new BaseWorker(
  "ai",

  async (job) => {
    const jobHandler = AIJobs[job.name];

    if (!jobHandler) {
      throw new Error(
        `Unknown AI Job: ${job.name}`
      );
    }

    console.log(
      `Processing AI Job: ${job.name}`
    );

    const result = await jobHandler(job);

    return result;
  },

  {
    concurrency: 10
  }
);