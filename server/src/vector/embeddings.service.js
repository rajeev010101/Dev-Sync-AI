import openai
from "../config/openai.js";

class EmbeddingService {
  async generate(
    text
  ) {
    const response =
      await openai.embeddings.create({
        model:
          process.env.EMBEDDING_MODEL,

        input: text
      });

    return response.data[0]
      .embedding;
  }
}

export default new EmbeddingService();