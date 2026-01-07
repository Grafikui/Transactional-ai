import { callClaude } from '../claudeProvider';

describe('Claude Provider', () => {
  it('returns a mock response if no API key is set', async () => {
    const prompt = 'Test prompt';
    const response = await callClaude(prompt);
    expect(response).toContain('[MOCK] Claude response');
  });
});
