import stripe from "../../config/stripe.js";

import PaymentRepository from "./payment.repository.js";

class WebhookController {
  handleWebhook =
    async (
      req,
      res
    ) => {
      const sig =
        req.headers[
          "stripe-signature"
        ];

      const event =
        stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env
            .STRIPE_WEBHOOK_SECRET
        );

      switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
          {
            const subscription =
              event.data.object;

            const existing =
              await PaymentRepository.findByCustomerId(
                subscription.customer
              );

            if (existing) {
              await PaymentRepository.updateSubscription(
                existing.user,
                {
                  stripeSubscriptionId:
                    subscription.id,

                  status:
                    subscription.status,

                  currentPeriodStart:
                    new Date(
                      subscription.current_period_start *
                        1000
                    ),

                  currentPeriodEnd:
                    new Date(
                      subscription.current_period_end *
                        1000
                    )
                }
              );
            }
          }

          break;

        case "customer.subscription.deleted":
          {
            const subscription =
              event.data.object;

            const existing =
              await PaymentRepository.findBySubscriptionId(
                subscription.id
              );

            if (existing) {
              await PaymentRepository.updateSubscription(
                existing.user,
                {
                  plan: "free",
                  status:
                    "cancelled"
                }
              );
            }
          }

          break;
      }

      res.json({
        received: true
      });
    };
}

export default new WebhookController();