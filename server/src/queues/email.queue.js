import QueueFactory from "./queue.factory.js";
import QueueEvents from "./queue.events.js";

const queue =
  QueueFactory.create("email");

QueueEvents.create("email");

class EmailQueue {
  async sendEmail(data) {
    return queue.add(
      "email.send",
      data,
      {
        attempts: 10,

        priority: 2
      }
    );
  }

  async sendResetEmail(data) {
    return queue.add(
      "email.reset-password",
      data
    );
  }

  async sendVerificationEmail(data) {
    return queue.add(
      "email.verify",
      data
    );
  }

  get instance() {
    return queue;
  }
}

export default new EmailQueue();