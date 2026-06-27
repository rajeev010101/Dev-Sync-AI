import Subscription from "../../models/Subscription.js";

class PaymentRepository {
  async getSubscription(userId) {
    return Subscription.findOne({
      user: userId
    });
  }

  async createSubscription(
    data
  ) {
    return Subscription.create(data);
  }

  async updateSubscription(
    userId,
    payload
  ) {
    return Subscription.findOneAndUpdate(
      {
        user: userId
      },
      payload,
      {
        new: true
      }
    );
  }

  async findByCustomerId(
    customerId
  ) {
    return Subscription.findOne({
      stripeCustomerId:
        customerId
    });
  }

  async findBySubscriptionId(
    subscriptionId
  ) {
    return Subscription.findOne({
      stripeSubscriptionId:
        subscriptionId
    });
  }
}

export default new PaymentRepository();