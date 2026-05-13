import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimiter } from './middleware/rate-limiter.js';
import { authMiddleware } from './middleware/auth-middleware.js';
import { logger } from './utils/logger.js';
import { 
  chatController, 
  getChats, 
  getChatDetails, 
  createNewChat,
  getUserUsage 
} from './controllers/chat-controller.js';

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 3001; 

// Public routes (none for now, everything requires auth)

// Protected routes
app.use('/api', authMiddleware);

app.get('/api/usage', getUserUsage);
app.get('/api/chats', getChats);
app.get('/api/chats/:id', getChatDetails);
app.post('/api/chats', createNewChat);

app.post('/api/chat', rateLimiter, (req, res) => {
  logger.info(`Chat request received from ${req.ip} (User: ${req.user.id})`);
  chatController(req, res);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
