import AIService from "../../modules/ai/ai.service.js";

export default async function summarizeChatJob(job) {
  const {
    chatId,
    userId
  } = job.data;

  return AIService.summarizeConversation({
    chatId,
    userId
  });
}