import BaseWorker from "./base.worker.js";

export default new BaseWorker(
  "notification",

  async (job) => {
    switch (job.name) {
      case "notification.send":
        console.log(
          "Notification"
        );

        break;

      case "notification.broadcast":
        console.log(
          "Broadcast"
        );

        break;

      default:
        throw new Error(
          `Unknown Notification Job`
        );
    }
  }
);