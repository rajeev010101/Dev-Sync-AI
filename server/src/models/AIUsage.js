import mongoose from "mongoose";

const aiUsageSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      model: String,

      promptTokens: Number,

      completionTokens: Number,

      totalTokens: Number,

      feature: String
    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "AIUsage",
  aiUsageSchema
);