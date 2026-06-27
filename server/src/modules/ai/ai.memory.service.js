import redis from "../../config/redis.js";

class AIMemoryService {
  async get(chatId) {
    const memory =
      await redis.get(
        `chat:${chatId}`
      );

    return memory
      ? JSON.parse(memory)
      : [];
  }

  async save(
    chatId,
    messages
  ) {
    await redis.set(
      `chat:${chatId}`,
      JSON.stringify(messages),
      "EX",
      3600
    );
  }
}

export default new AIMemoryService();