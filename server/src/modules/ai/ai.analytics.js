import redis from "../../config/redis.js";

export const checkUsageLimit =
  async (userId, limit) => {
    const key =
      `ai-limit:${userId}`;

    const count =
      await redis.get(key);

    if (
      count &&
      Number(count) >= limit
    ) {
      return false;
    }

    await redis.multi()
      .incr(key)
      .expire(key, 86400)
      .exec();

    return true;
  };