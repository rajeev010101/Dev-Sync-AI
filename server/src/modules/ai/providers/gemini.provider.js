import genAI from "../../../config/gemini.js";

class GeminiProvider {
  async generate(messages) {
    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

    const prompt =
      messages
        .map((m) => m.content)
        .join("\n");

    const result =
      await model.generateContent(prompt);

    return {
      content:
        result.response.text(),
      usage: {}
    };
  }
}

export default GeminiProvider;