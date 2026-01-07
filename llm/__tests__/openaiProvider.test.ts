import { callOpenAI } from '../openaiProvider';

describe('OpenAI Provider', () => {
  it('returns a mock response if no API key is set', async () => {
    const prompt = 'Test prompt';
    const response = await callOpenAI(prompt);
    expect(response).toContain('[MOCK]');
  });
});
