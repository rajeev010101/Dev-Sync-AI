import BaseWorker from "./base.worker.js";
import EmailJobs from "../jobs/email/index.js";


export default new BaseWorker(
  "email",
  async (job) => {
    const handler = EmailJobs[job.name];

    if (!handler) {
      throw new Error(
        `Unknown Email Job: ${job.name}`
      );
    }

    console.log(
      `Processing Email Job: ${job.name}`
    );

    return handler(job);
  },
  {
    concurrency: 5,
  }
);