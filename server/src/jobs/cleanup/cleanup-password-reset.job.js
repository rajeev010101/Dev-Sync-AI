import PasswordResetToken from "../../models/PasswordResetToken.js";

export default async function cleanupPasswordResetJob() {
  const result = await PasswordResetToken.deleteMany({
    expiresAt: {
      $lt: new Date(),
    },
  });

  return {
    deletedCount: result.deletedCount,
  };
}