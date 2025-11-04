import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';

const router = express.Router();

// Prefer a server-side env var named GEMINI_API_KEY. If for some reason a Vite env var
// was used, allow it as a fallback (but don't rely on client-side keys in production).
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "AIzaSyCp3SE_qPAZiqW2TQEEktJIwhpI4kNcXEs";
if (!apiKey) {
  console.warn('Gemini API key is not set. Set GEMINI_API_KEY in the server environment.');
}

// Initialize Gemini client (keep existing shape - adjust if your SDK expects a different signature)
const genAI = new GoogleGenerativeAI(apiKey as string);

// Helper to get the model
const getModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
};

// Chat endpoint
router.post('/api/chat', async (req: express.Request, res: express.Response) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages must be a non-empty array' });
    }
    if (!apiKey) {
      return res.status(500).json({ error: 'Server misconfiguration: missing Gemini API key' });
    }

    const model = getModel();
    const chat = model.startChat();

    const last = messages[messages.length - 1];
    const userText = typeof last === 'string' ? last : last?.content;
    if (!userText || typeof userText !== 'string') {
      return res.status(400).json({ error: 'Last message must contain string content' });
    }

    const result = await chat.sendMessage(userText);
    const response = await result.response;

    res.json({
      role: 'assistant',
      content: response.text?.() ?? String(response),
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;