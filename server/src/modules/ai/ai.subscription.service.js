import {
  SUBSCRIPTION_PLANS
} from "../../constants/subscription.js";

export const canUseAI =
  (user) => {
    switch (user.plan) {
      case SUBSCRIPTION_PLANS.FREE:
        return true;

      case SUBSCRIPTION_PLANS.PRO:
        return true;

      case SUBSCRIPTION_PLANS.ENTERPRISE:
        return true;

      default:
        return false;
    }
  };