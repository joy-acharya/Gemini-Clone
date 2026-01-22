import { GoogleGenerativeAI } from '@google/generative-ai';

// Vite environment variable for security
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const runChat = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Error: ' + (error.message || 'Failed to fetch response.');
  }
};

export default runChat;
