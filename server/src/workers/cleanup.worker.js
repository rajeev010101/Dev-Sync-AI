import BaseWorker from "./base.worker.js";

export default new BaseWorker(
  "cleanup",

  async (job) => {
    switch (job.name) {
      case "cleanup.tokens":
      case "cleanup.uploads":
      case "cleanup.logs":
        console.log(
          "Cleanup Task"
        );

        break;

      default:
        throw new Error(
          "Unknown Cleanup Job"
        );
    }
  }
);