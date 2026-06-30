import QueueFactory from "./queue.factory.js";
import QueueEvents from "./queue.events.js";

const queue =
  QueueFactory.create(
    "cleanup"
  );

QueueEvents.create(
    "cleanup"
);

class CleanupQueue {
  async cleanupTokens() {
    return queue.add(
      "cleanup.tokens",
      {}
    );
  }

  async cleanupUploads() {
    return queue.add(
      "cleanup.uploads",
      {}
    );
  }

  async cleanupLogs() {
    return queue.add(
      "cleanup.logs",
      {}
    );
  }

  get instance() {
    return queue;
  }
}

export default new CleanupQueue();