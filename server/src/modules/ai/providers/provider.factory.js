import OpenAIProvider from "./openai.provider.js";
import GeminiProvider from "./gemini.provider.js";

class ProviderFactory {
  static getProvider() {
    const provider =
      process.env.AI_PROVIDER;

    switch (provider) {
      case "openai":
        return new OpenAIProvider();

      case "gemini":
        return new GeminiProvider();

      default:
        return new GeminiProvider();
    }
  }
}

export default ProviderFactory;