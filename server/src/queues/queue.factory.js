import { Queue } from "bullmq";

import connection from "./connection.js";

class QueueFactory {
  create(name) {
    return new Queue(name, {
      connection,

      defaultJobOptions: {
        attempts: 5,

        backoff: {
          type: "exponential",

          delay: 2000
        },

        removeOnComplete: 100,

        removeOnFail: 500
      }
    });
  }
}

export default new QueueFactory();