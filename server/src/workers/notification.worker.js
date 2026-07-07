import BaseWorker from "./base.worker.js";
import NotificationJobs from "../jobs/notifications/index.js";

export default new BaseWorker(
  "notification",

  async (job) => {
    const handler = NotificationJobs[job.name];

    if (!handler) {
      throw new Error(
        `Unknown Notification Job: ${job.name}`
      );
    }

    console.log(
      `Processing Notification Job: ${job.name}`
    );

    return handler(job);
  },

  {
    concurrency: 10,
  }
);