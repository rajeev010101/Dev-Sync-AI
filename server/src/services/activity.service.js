import ActivityLog from "../models/ActivityLog.js";

export const logActivity =
  async (
    user,
    action,
    metadata = {}
  ) => {
    await ActivityLog.create({
      user,
      action,
      metadata
    });
  };