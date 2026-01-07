// import { callOpenAI } from './openaiProvider'; // Uncomment when OpenAI API key is available
import { callGemini } from './geminiProvider';
// import { callClaude } from './claudeProvider'; // Uncomment when Claude API key is available
/**
 * Call the specified LLM provider. Only Gemini is active; others are ready for integration.
 * @param provider 'gemini' (active), 'openai' or 'claude' (commented out)
 * @param prompt   Prompt string
 */
export async function callLLM(provider: 'gemini' /*| 'openai' | 'claude'*/, prompt: string): Promise<string> {
  // if (provider === 'openai') return callOpenAI(prompt); // Uncomment when OpenAI API key is available
  if (provider === 'gemini') return callGemini(prompt);
  // if (provider === 'claude') return callClaude(prompt); // Uncomment when Claude API key is available
  throw new Error('Provider not implemented or not enabled');
}
