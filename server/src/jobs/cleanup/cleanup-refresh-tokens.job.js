import RefreshToken from "../../models/RefreshToken.js";

export default async function cleanupRefreshTokensJob() {
  const result = await RefreshToken.deleteMany({
    expiresAt: {
      $lt: new Date(),
    },
  });

  return {
    deletedCount: result.deletedCount,
  };
}