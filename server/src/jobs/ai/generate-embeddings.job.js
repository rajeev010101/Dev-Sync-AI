import MemoryService from "../../vector/memory.service.js";

export default async function generateEmbeddingsJob(job) {
  const {
    userId,
    text
  } = job.data;

  await MemoryService.saveMemory(userId, text);

  return {
    success: true
  };
}