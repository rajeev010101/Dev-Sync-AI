import mongoose from "mongoose";
import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  stripePaymentIntentId: String,

  amount: Number,

  currency: {
    type: String,
    default: "usd"
  },

  status: String
});

baseSchemaPlugin(schema);

export default mongoose.model(
  "Payment",
  schema
);