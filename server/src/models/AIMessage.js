import mongoose from "mongoose";
import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";

const aiMessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AIChat",
    required: true
  },

  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },

  content: {
    type: String,
    required: true
  }
});

baseSchemaPlugin(aiMessageSchema);

export default mongoose.model(
  "AIMessage",
  aiMessageSchema
);