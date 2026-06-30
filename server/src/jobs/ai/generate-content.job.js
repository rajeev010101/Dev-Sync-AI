import AIService from "../../modules/ai/ai.service.js";

export default async function generateContentJob(job) {
  const {
    userId,
    prompt,
    template,
    io
  } = job.data;

  return AIService.generateContent({
    userId,
    prompt,
    template,
    io
  });
}