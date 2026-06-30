import { Worker } from "bullmq";

import connection from "../queues/connection.js";

class BaseWorker {
  constructor(queueName, processor, options = {}) {
    this.worker = new Worker(
      queueName,
      async (job) => {
        console.log(
          `▶ Processing [${queueName}] Job ${job.id}`
        );

        const startedAt = Date.now();

        try {
          await job.updateProgress(5);

          const result = await processor(job);

          await job.updateProgress(100);

          console.log(
            `✔ ${queueName} Job ${job.id} completed in ${
              Date.now() - startedAt
            }ms`
          );

          return result;
        } catch (error) {
          console.error(
            `✖ ${queueName} Job ${job.id} failed`
          );

          console.error(error);

          throw error;
        }
      },
      {
        connection,

        concurrency:
          options.concurrency || 5
      }
    );

    this.registerEvents();
  }

  registerEvents() {
    this.worker.on(
      "completed",
      (job) => {
        console.log(
          `Completed Job ${job.id}`
        );
      }
    );

    this.worker.on(
      "failed",
      (
        job,
        error
      ) => {
        console.error(
          `Failed Job ${job?.id}`
        );

        console.error(error);
      }
    );

    this.worker.on(
      "error",
      (error) => {
        console.error(
          "Worker Error"
        );

        console.error(error);
      }
    );
  }

  async close() {
    await this.worker.close();

    console.log(
      "Worker Closed"
    );
  }
}

export default BaseWorker;