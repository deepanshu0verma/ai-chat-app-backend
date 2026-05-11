High-Performance AI Orchestration Layer
The backend engine for Neural Studio, a decoupled Node.js environment designed to manage secure AI inference, rate limiting, and structured logging for Gemini-powered communication.

🛠️ Tech Stack
Runtime: Node.js (ESM)

Framework: Express.js

AI Integration: Vercel AI SDK (@ai-sdk/google)

Security: Express-Rate-Limit & CORS

Logging: Custom Utility-based logging

🏗️ Architecture
The project follows a Layered Service Architecture to ensure separation of concerns:

Controllers: Handle incoming HTTP requests and manage response lifecycle.

Services: Contain the core business logic and AI model orchestration.

Middleware: Manages cross-cutting concerns like security headers and rate limiting.

Utils: Shared helper functions for logging and formatting.

🚀 Getting Started
1. Prerequisites
Node.js (v18+)

A Google AI Studio API Key

2. Installation
Bash
git clone <your-repo-url>
cd backend
npm install
3. Environment Setup
Create a .env file in the root directory:

Code snippet
PORT=3001
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
4. Running the Server
Development Mode (with auto-reload):

Bash
npm run dev
Production Mode:

Bash
npm start
🔌 API Endpoints
POST /api/chat
The primary endpoint for neural inference.

Request Body:

JSON
{
  "messages": [
    { "role": "user", "content": "Hello, Gemini." }
  ]
}
Response Body:

JSON
{
  "text": "Hello! How can I assist with your technical requirements today?"
}
🛡️ Security & Optimization
CORS Enabled: Configured to allow requests only from trusted frontend origins (localhost:3000).

Rate Limiting: Protects the Gemini API quota from abuse by limiting requests per IP.

Decoupled Strategy: By processing AI requests on the server, we prevent the exposure of sensitive API keys to the client-side.

📝 Project Structure
Plaintext
backend/
├── config/             # Provider & Model configurations
├── controllers/        # Request handlers
├── middleware/         # Security & Rate limiting
├── services/           # AI Logic (Gemini integration)
├── utils/              # Logger & Helpers
├── index.js            # Entry point
└── .env                # Environment variables (ignored)
👤 Author
Deepanshu Verma Full Stack Developer | MERN Stack Engineer
