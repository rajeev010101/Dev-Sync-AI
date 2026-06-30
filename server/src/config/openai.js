import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

console.log("OPENAI KEY EXISTS:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;