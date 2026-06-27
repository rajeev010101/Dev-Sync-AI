import qdrant
from "../config/qdrant.js";

import EmbeddingService
from "./embeddings.service.js";

import { v4 as uuid }
from "uuid";

class MemoryService {
  async saveMemory(
    userId,
    text
  ) {
    const embedding =
      await EmbeddingService.generate(
        text
      );

    await qdrant.upsert(
      process.env
        .VECTOR_COLLECTION,
      {
        points: [
          {
            id: uuid(),

            vector:
              embedding,

            payload: {
              userId,
              text
            }
          }
        ]
      }
    );
  }

  async searchMemory(
    userId,
    query
  ) {
    const embedding =
      await EmbeddingService.generate(
        query
      );

    return qdrant.search(
      process.env
        .VECTOR_COLLECTION,
      {
        vector:
          embedding,

        limit: 5,

        filter: {
          must: [
            {
              key: "userId",
              match: {
                value:
                  userId
              }
            }
          ]
        }
      }
    );
  }
}

export default new MemoryService();