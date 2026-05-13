import { generateText } from 'ai';
import { chatModel } from '../config/ai-provider.js';
import { DEVELOPER_PROMPT } from '../prompts/system-prompts.js';

export async function getAiChatResponse(messages) {
  const result = await generateText({
    model: chatModel,
    system: DEVELOPER_PROMPT,
    messages,
  });

  // Return the result object which includes text and usage
  return result;
}