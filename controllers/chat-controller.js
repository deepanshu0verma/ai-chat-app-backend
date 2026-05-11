import { getAiChatResponse } from '../services/ai-service.js';

export async function chatController(req, res) {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    // Wait for the full response
    const aiText = await getAiChatResponse(messages);

    // Send simple JSON back to the frontend
    return res.json({ text: aiText });

  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ error: "Failed to get AI response" });
  }
}