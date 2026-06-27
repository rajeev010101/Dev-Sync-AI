import Subscription from "../models/Subscription.js";

const checkSubscription =
  (plans = []) =>
  async (
    req,
    res,
    next
  ) => {
    const subscription =
      await Subscription.findOne({
        user:
          req.user.userId
      });

    if (
      !subscription ||
      !plans.includes(
        subscription.plan
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Subscription required"
      });
    }

    next();
  };

export default checkSubscription;