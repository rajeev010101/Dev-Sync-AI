 import mongoose from "mongoose";
import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";

const generatedContentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  prompt: {
    type: String,
    required: true
  },

  result: {
    type: String,
    required: true
  },

  contentType: {
    type: String,
    enum: [
      "blog",
      "email",
      "linkedin",
      "twitter",
      "documentation"
    ]
  }
});

baseSchemaPlugin(generatedContentSchema);

export default mongoose.model(
  "GeneratedContent",
  generatedContentSchema
);