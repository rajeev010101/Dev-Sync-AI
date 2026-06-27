import mongoose from "mongoose";

const baseSchemaPlugin = (schema) => {
  schema.add({
    isDeleted: {
      type: Boolean,
      default: false
    }
  });

  schema.set("timestamps", true);

  schema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      return ret;
    }
  });

  schema.set("toObject", {
    virtuals: true
  });
};

export default baseSchemaPlugin;