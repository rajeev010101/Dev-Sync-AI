import AIService from "../../modules/ai/ai.service.js";

export default async function processChatJob(job) {
  const {
    userId,
    chatId,
    message,
    io
  } = job.data;

  const result = await AIService.sendMessage({
    userId,
    chatId,
    message,
    io
  });

  return result;
}