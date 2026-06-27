import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import baseSchemaPlugin from "./plugins/baseSchema.plugin.js";
import { ROLES } from "../constants/roles.js";
import { SUBSCRIPTION_PLANS } from "../constants/subscription.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },

  avatar: {
    url: String,
    publicId: String
  },

  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  },

  plan: {
    type: String,
    enum: Object.values(SUBSCRIPTION_PLANS),
    default: SUBSCRIPTION_PLANS.FREE
  },

  emailVerified: {
    type: Boolean,
    default: false
  },

  lastLoginAt: Date,

  isActive: {
    type: Boolean,
    default: true
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    12
  );
});

userSchema.methods.comparePassword =
  async function (password) {
    return bcrypt.compare(
      password,
      this.password
    );
  };

export default mongoose.model("User", userSchema);