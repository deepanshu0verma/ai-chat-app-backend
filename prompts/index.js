import { DEVELOPER_PROMPT, CREATIVE_PROMPT } from './system-prompts.js';

export const getPromptByRole = (role) => {
  const prompts = {
    developer: DEVELOPER_PROMPT,
    creative: CREATIVE_PROMPT,
    default: DEVELOPER_PROMPT
  };
  
  return prompts[role] || prompts.default;
};

export { DEVELOPER_PROMPT, CREATIVE_PROMPT };