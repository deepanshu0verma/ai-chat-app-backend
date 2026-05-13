# ⚙️ Neural Studio Backend - AI Orchestration Layer

The backend engine for Neural Studio, a decoupled Node.js environment designed to manage secure AI inference, rate limiting, and structured logging for Gemini-powered communication.

## 🛠️ Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: [Express.js](https://expressjs.com/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) (`@ai-sdk/google`)
- **Security**: Express-Rate-Limit & CORS
- **Logging**: Custom Utility-based logging
- **Development**: Nodemon

## 🏗️ Architecture

The project follows a **Layered Service Architecture** to ensure separation of concerns:

- **Controllers**: Handle incoming HTTP requests and manage response lifecycle.
- **Services**: Contain the core business logic and AI model orchestration.
- **Middleware**: Manages cross-cutting concerns like security headers and rate limiting.
- **Utils**: Shared helper functions for logging and formatting.
- **Prompts**: Managed system prompts and AI personality configurations.

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- A [Google AI Studio API Key](https://aistudio.google.com/)

### 2. Installation

```bash
# Navigate to backend directory
cd ai-chat-app-backend

# Install dependencies
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3001
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### 4. Running the Server

```bash
# Development Mode (with auto-reload)
npm run dev

# Production Mode
npm start
```

## 🔌 API Endpoints

### `POST /api/chat`
The primary endpoint for neural inference.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello, Gemini." }
  ]
}
```

**Response Body:**
```json
{
  "text": "Hello! How can I assist with your technical requirements today?"
}
```

## 🛡️ Security & Optimization

- **CORS Enabled**: Configured to allow requests only from trusted frontend origins.
- **Rate Limiting**: Protects the Gemini API quota from abuse by limiting requests per IP.
- **Decoupled Strategy**: By processing AI requests on the server, we prevent the exposure of sensitive API keys to the client-side.

## 📂 Project Structure

- `controllers/`: Request handlers.
- `services/`: AI logic and external service integrations.
- `middleware/`: Security and utility middlewares.
- `prompts/`: System instructions for the AI.
- `config/`: Configuration files (AI provider setup).
- `utils/`: Logging and helper utilities.

## 👤 Author

**Deepanshu Verma**
Full Stack Developer | MERN Stack Engineer
