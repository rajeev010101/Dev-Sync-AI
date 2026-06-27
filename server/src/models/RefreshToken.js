import mongoose from "mongoose";
import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";

const refreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  token: {
    type: String,
    required: true
  },

  expiresAt: {
    type: Date,
    required: true
  },

  revoked: {
    type: Boolean,
    default: false
  }
});

baseSchemaPlugin(refreshTokenSchema);

export default mongoose.model(
  "RefreshToken",
  refreshTokenSchema
);