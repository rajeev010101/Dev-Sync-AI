import User from "../../models/User.js";

import PaymentRepository from "./payment.repository.js";

import StripeService from "./stripe.service.js";

class PaymentService {
  async createCheckout(
    userId,
    priceId
  ) {
    const user =
      await User.findById(
        userId
      );

    let subscription =
      await PaymentRepository.getSubscription(
        userId
      );

    if (!subscription) {
      const customer =
        await StripeService.createCustomer(
          user
        );

      subscription =
        await PaymentRepository.createSubscription(
          {
            user: user._id,

            stripeCustomerId:
              customer.id
          }
        );
    }

    const session =
      await StripeService.createCheckoutSession(
        {
          customerId:
            subscription.stripeCustomerId,

          priceId
        }
      );

    return session;
  }

  async createBillingPortal(
    userId
  ) {
    const subscription =
      await PaymentRepository.getSubscription(
        userId
      );

    return StripeService.createPortalSession(
      subscription.stripeCustomerId
    );
  }
}

export default new PaymentService();