import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function callOpenAI(prompt: string): Promise<string> {
  // MVP: Return a mock response if no API key is set
  if (!process.env.OPENAI_API_KEY) {
    return '[MOCK] OpenAI response for prompt: ' + prompt;
  }
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message?.content || '';
}
