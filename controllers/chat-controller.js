import { getAiChatResponse } from '../services/ai-service.js';
import * as db from '../services/db-service.js';

const DAILY_LIMIT = parseInt(process.env.DAILY_TOKEN_LIMIT || '5000', 10);

export async function chatController(req, res) {
  try {
    const { messages, chatId } = req.body;
    const user = req.user;

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    // 1. Check Token Quota
    const profile = await db.getUserProfile(user.id, user.email);
    if (profile.daily_token_usage >= DAILY_LIMIT) {
      return res.status(429).json({ 
        error: "Daily token limit reached", 
        usage: profile.daily_token_usage,
        limit: DAILY_LIMIT 
      });
    }

    // 2. Identify or Create Chat
    let currentChatId = chatId;
    if (!currentChatId) {
      // Create a title from the first message if it's a new chat
      const firstMessage = messages.find(m => m.role === 'user')?.content || 'New Chat';
      const chatTitle = firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
      const newChat = await db.createChat(user.id, chatTitle);
      currentChatId = newChat.id;
    }

    // 3. Save User Message
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && lastUserMessage.role === 'user') {
      await db.saveMessage(currentChatId, 'user', lastUserMessage.content);
    }

    // 4. Get AI Response
    const aiResult = await getAiChatResponse(messages);
    const aiText = aiResult.text;
    const tokensUsed = aiResult.usage.totalTokens;

    // 5. Save AI Message
    await db.saveMessage(currentChatId, 'assistant', aiText);

    // 6. Update User Usage
    await db.updateUserUsage(user.id, tokensUsed);

    // 7. Return Response
    return res.json({ 
      text: aiText, 
      chatId: currentChatId,
      usage: {
        used: profile.daily_token_usage + tokensUsed,
        limit: DAILY_LIMIT
      }
    });

  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ error: "Failed to process chat" });
  }
}

export async function getChats(req, res) {
  try {
    const chats = await db.getUserChats(req.user.id);
    return res.json(chats);
  } catch (error) {
    console.error("Get Chats Error:", error);
    return res.status(500).json({ error: "Failed to fetch chats" });
  }
}

export async function getChatDetails(req, res) {
  try {
    const { id } = req.params;
    const messages = await db.getChatHistory(id);
    return res.json(messages);
  } catch (error) {
    console.error("Get Chat Details Error:", error);
    return res.status(500).json({ error: "Failed to fetch chat messages" });
  }
}

export async function createNewChat(req, res) {
  try {
    const { title } = req.body;
    const chat = await db.createChat(req.user.id, title || 'New Exploration');
    return res.json(chat);
  } catch (error) {
    console.error("Create Chat Error:", error);
    return res.status(500).json({ error: "Failed to create new chat" });
  }
}

export async function getUserUsage(req, res) {
  try {
    const profile = await db.getUserProfile(req.user.id, req.user.email);
    return res.json({
      used: profile.daily_token_usage,
      limit: DAILY_LIMIT
    });
  } catch (error) {
    console.error("Get Usage Error:", error);
    return res.status(500).json({ error: "Failed to fetch usage data" });
  }
}
