import openai from "../../config/openai.js";

export const streamCompletion =
  async (
    res,
    messages
  ) => {
    const stream =
      await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages,
        stream: true
      });

    for await (const chunk of stream) {
      const text =
        chunk.choices[0]?.delta?.content;

      if (text) {
        res.write(
          `data: ${JSON.stringify({
            text
          })}\n\n`
        );
      }
    }

    res.write(
      "data: [DONE]\n\n"
    );

    res.end();
  };