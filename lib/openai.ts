import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY || "";

export const openai = new OpenAI({
  apiKey: apiKey || "placeholder-key-for-build", // fallback to prevent initialization crash if not set in build pipelines
});
