import QueueFactory from "./queue.factory.js";
import QueueEvents from "./queue.events.js";

const queue =
  QueueFactory.create(
    "notification"
  );

QueueEvents.create(
  "notification"
);

class NotificationQueue {
  async send(data) {
    return queue.add(
      "notification.send",
      data,
      {
        priority: 2
      }
    );
  }

  async broadcast(data) {
    return queue.add(
      "notification.broadcast",
      data
    );
  }

  get instance() {
    return queue;
  }
}

export default new NotificationQueue();