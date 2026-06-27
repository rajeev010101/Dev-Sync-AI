import PaymentService from "./payment.service.js";

class PaymentController {
  createCheckout =
    async (
      req,
      res,
      next
    ) => {
      try {
        const session =
          await PaymentService.createCheckout(
            req.user.userId,
            req.body.priceId
          );

        res.json({
          url: session.url
        });
      } catch (error) {
        next(error);
      }
    };

  billingPortal =
    async (
      req,
      res,
      next
    ) => {
      try {
        const session =
          await PaymentService.createBillingPortal(
            req.user.userId
          );

        res.json({
          url: session.url
        });
      } catch (error) {
        next(error);
      }
    };
}

export default new PaymentController();