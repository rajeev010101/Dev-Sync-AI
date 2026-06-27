import CompressionService
from "./compression.service.js";

class ContextService {
  build(
    messages,
    vectorMemory
  ) {
    return [
      ...vectorMemory,

      ...CompressionService.compress(
        messages
      )
    ];
  }
}

export default new ContextService();