import mongoose from "mongoose";
import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  fileName: {
    type: String,
  },

  url: {
    type: String,
  },

  publicId: {
    type: String,
  },

  thumbnailUrl: {
    type: String,
  },

  checksum: {
    type: String,
  },

  extractedText: {
    type: String,
  },

  metadata: {
    type: Object,
    default: {},
  },
});

baseSchemaPlugin(schema);

export default mongoose.model("File", schema);