import processChatJob from "./process-chat.job.js";
import generateContentJob from "./generate-content.job.js";
import generateEmbeddingsJob from "./generate-embeddings.job.js";
import summarizeChatJob from "./summarize-chat.job.js";

const AIJobs = {
  "chat.generate": processChatJob,
  "content.generate": generateContentJob,
  "embedding.generate": generateEmbeddingsJob,
  "chat.summary": summarizeChatJob,
};

export default AIJobs;