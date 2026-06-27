import stripe from "../../config/stripe.js";

class StripeService {
  async createCustomer(
    user
  ) {
    return stripe.customers.create({
      email: user.email,
      name:
        `${user.firstName} ${user.lastName}`
    });
  }

  async createCheckoutSession({
    customerId,
    priceId
  }) {
    return stripe.checkout.sessions.create({
      customer: customerId,

      mode: "subscription",

      payment_method_types: [
        "card"
      ],

      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],

      success_url:
        process.env
          .STRIPE_SUCCESS_URL,

      cancel_url:
        process.env
          .STRIPE_CANCEL_URL
    });
  }

  async createPortalSession(
    customerId
  ) {
    return stripe.billingPortal.sessions.create(
      {
        customer: customerId,
        return_url:
          process.env
            .STRIPE_SUCCESS_URL
      }
    );
  }
}

export default new StripeService();