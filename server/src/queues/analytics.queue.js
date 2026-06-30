import QueueFactory from "./queue.factory.js";
import QueueEvents from "./queue.events.js";

const queue =
  QueueFactory.create(
    "analytics"
  );

QueueEvents.create(
  "analytics"
);

class AnalyticsQueue {
  async trackUsage(data) {
    return queue.add(
      "analytics.track",
      data
    );
  }

  async aggregateDaily(data) {
    return queue.add(
      "analytics.daily",
      data
    );
  }

  get instance() {
    return queue;
  }
}

export default new AnalyticsQueue();