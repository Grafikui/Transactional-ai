jest.mock('node-fetch', () => async (...args: any[]) => ({
  ok: true,
  json: async () => ({ candidates: [{ content: { parts: [{ text: 'Gemini real response' }] } }] })
}));

import { callGemini } from '../geminiProvider';

describe('Gemini Provider', () => {
  it('returns a mock response if no API key is set', async () => {
    delete process.env.GEMINI_API_KEY;
    const prompt = 'Test prompt';
    const response = await callGemini(prompt);
    expect(response).toContain('[MOCK] Gemini response');
  });

  it('returns a real response if API key is set', async () => {
    process.env.GEMINI_API_KEY = 'fake-key';
    const prompt = 'Test prompt';
    const response = await callGemini(prompt);
    expect(response).toBe('Gemini real response');
    delete process.env.GEMINI_API_KEY;
  });
});
