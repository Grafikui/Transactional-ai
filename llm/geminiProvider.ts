// Gemini (Google AI) provider integration
// Uses Google Generative Language API (Gemini Pro)
import fetch from 'node-fetch';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return '[MOCK] Gemini response for prompt: ' + prompt;
  }
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    return `[ERROR] Gemini API: ${response.status} ${response.statusText}`;
  }
  const data = await response.json();
  // Type assertion for Gemini API response
  type GeminiResponse = {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };
  const geminiData = data as GeminiResponse;
  // Extract the generated text from the response
  return geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '[NO RESPONSE]';
}
