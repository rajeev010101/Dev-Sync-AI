import mongoose from "mongoose";

const subscriptionSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },

      stripeCustomerId: {
        type: String,
        required: true
      },

      stripeSubscriptionId: {
        type: String
      },

      stripePriceId: {
        type: String
      },

      plan: {
        type: String,
        enum: [
          "free",
          "pro",
          "enterprise"
        ],
        default: "free"
      },

      status: {
        type: String,
        default: "inactive"
      },

      currentPeriodStart: Date,

      currentPeriodEnd: Date,

      cancelAtPeriodEnd: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "Subscription",
  subscriptionSchema
);