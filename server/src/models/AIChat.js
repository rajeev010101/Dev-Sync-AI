import mongoose from "mongoose";
import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";

const aiChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  }
});

baseSchemaPlugin(aiChatSchema);

export default mongoose.model(
  "AIChat",
  aiChatSchema
);