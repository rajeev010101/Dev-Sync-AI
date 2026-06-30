import QueueFactory from "./queue.factory.js";
import QueueEvents from "./queue.events.js";

const queue =
  QueueFactory.create(
    "upload"
  );

QueueEvents.create("upload");

class UploadQueue {
  async processUpload(data) {
    return queue.add(
      "upload.process",
      data
    );
  }

  async optimizeImage(data) {
    return queue.add(
      "image.optimize",
      data
    );
  }

  async analyzeDocument(data) {
    return queue.add(
      "document.analyze",
      data
    );
  }

  get instance() {
    return queue;
  }
}

export default new UploadQueue();