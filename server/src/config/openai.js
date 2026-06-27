import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

console.log("KEY:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;