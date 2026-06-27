import ProviderFactory
from "../providers/provider.factory.js";

class ChatAgent {
  async execute(
    context
  ) {
    return ProviderFactory.execute(
      context
    );
  }
}

export default new ChatAgent();