import { Queue }
from "bullmq";

const uploadQueue =
  new Queue(
    "upload-processing",
    {
      connection: {
        host:
          "localhost",
        port: 6379
      }
    }
  );

export default uploadQueue;