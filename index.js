import express from 'express';
import cors from 'cors'; // Don't forget CORS for your frontend!
import dotenv from 'dotenv';
import { rateLimiter } from './middleware/rate-limiter.js';
import { logger } from './utils/logger.js';
import { chatController } from './controllers/chat-controller.js';

dotenv.config();

const app = express();

// 1. Enable CORS so your Next.js app (localhost:3000) can talk to this port
app.use(cors()); 

app.use(express.json());

// 2. Define the Port
const PORT = process.env.PORT || 3001; 

app.use('/api/chat', rateLimiter);

app.post('/api/chat', (req, res) => {
  logger.info(`Chat request received from ${req.ip}`);
  chatController(req, res);
});

// 3. Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});