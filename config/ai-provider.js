import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const googleProvider = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Default model configuration
export const chatModel = googleProvider('gemini-3-flash-preview');