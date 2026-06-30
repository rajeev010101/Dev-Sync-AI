import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,

  enableReadyCheck: true,

  lazyConnect: false,

  retryStrategy(times) {
    return Math.min(times * 1000, 5000);
  }
});

connection.on("connect", () => {
  console.log("✅ BullMQ Redis Connected");
});

connection.on("ready", () => {
  console.log("✅ BullMQ Redis Ready");
});

connection.on("error", (error) => {
  console.error("❌ BullMQ Redis Error:", error.message);
});

export default connection;