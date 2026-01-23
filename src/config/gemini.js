import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const runChat = async (prompt) => {
  // 1.5 Flash has more stable quotas for free tier users
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Check if the error is a rate limit (429)
    if (error.message?.includes('429')) {
      return "System is busy (Rate Limit reached). Please wait a moment and try again.";
    }
    console.error('Gemini API Error:', error);
    return 'Error: ' + (error.message || 'Failed to fetch response.');
  }
};

export default runChat;