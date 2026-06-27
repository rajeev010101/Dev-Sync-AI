import mongoose from "mongoose";
import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  action: {
    type: String,
    required: true
  },

  metadata: {
    type: Object,
    default: {}
  }
});

baseSchemaPlugin(schema);

export default mongoose.model(
  "ActivityLog",
  schema
);