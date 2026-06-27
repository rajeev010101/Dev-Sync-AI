import { Worker }
from "bullmq";

new Worker(
  "ai-processing",

  async (job) => {
    console.log(
      "Processing AI job",
      job.id
    );

    // process message
  },

  {
    connection: {
      host:
        "localhost",

      port: 6379
    }
  }
);