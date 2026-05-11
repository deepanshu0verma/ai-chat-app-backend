import { generateText } from 'ai'; // Change from streamText to generateText
import { chatModel } from '../config/ai-provider.js';
import { DEVELOPER_PROMPT } from '../prompts/system-prompts.js';

export async function getAiChatResponse(messages) {
  const result = await generateText({
    model: chatModel,
    system: DEVELOPER_PROMPT,
    messages,
  });

  // Return just the text content
  return result.text;
}