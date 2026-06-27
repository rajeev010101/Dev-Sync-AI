import { Queue }
from "bullmq";

const aiQueue =
  new Queue(
    "ai-processing",
    {
      connection: {
        host:
          "localhost",

        port: 6379
      }
    }
  );

export default aiQueue;