import openai from "../../../config/openai.js";

class OpenAIProvider {
  async generate(messages) {
    const response =
      await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages
      });

    return {
      content:
        response.choices[0].message.content,
      usage: response.usage
    };
  }
}

export default OpenAIProvider;