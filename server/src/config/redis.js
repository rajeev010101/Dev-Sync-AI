import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectTimeout: 10000,
  lazyConnect: false,
  keepAlive: 30000,
  retryStrategy(times) {
    console.log(`Redis reconnecting... Attempt ${times}`);
    return Math.min(times * 1000, 5000);
  },
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("ready", () => {
  console.log("✅ Redis Ready");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err.message);
});

redis.on("close", () => {
  console.log("🔴 Redis Connection Closed");
});

redis.on("reconnecting", () => {
  console.log("🟡 Redis Reconnecting...");
});

export default redis;