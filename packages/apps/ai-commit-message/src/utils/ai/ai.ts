import { GoogleGenAI } from '@google/genai';

export interface GenerateAIMessageParams {
  pattern: string | null;
  branchName: string;
  diff: string;
  geminiApiKey: string;
  maxTokens: number;
  instruction: string | null;
}

export interface AIModelConfig {
  model: string;
  maxTokens: number;
  systemInstruction: string;
}

const MODELS = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'] as const;

/**
 * Create model configuration
 */
function createModelConfig(params: GenerateAIMessageParams, model: string): AIModelConfig {
  const { pattern, instruction, maxTokens } = params;

  const systemInstruction = [
    'write a git commit message less than 72 characters.',
    'Do not capitalize the first letter of the message.',
    pattern ? `If the pattern ${pattern} can be found in the branch name, then prefix the message in the format of <pattern>:.` : null,
    instruction ? ` ${instruction}` : null,
  ]
    .filter((elm) => Boolean(elm))
    .join(' ');

  return { model, maxTokens, systemInstruction };
}

/**
 * Try to generate content with a specific model
 */
async function tryModel(googleAI: GoogleGenAI, config: AIModelConfig, params: GenerateAIMessageParams): Promise<string> {
  const prompt = `git branch name is: ${params.branchName} and changes are: ${params.diff}`;

  // Check token count first
  const { totalTokens } = await googleAI.models.countTokens({
    model: config.model,
    contents: prompt,
  });

  if ((totalTokens ?? Infinity) > config.maxTokens) {
    throw new Error('Total tokens exceed the limit');
  }

  // Generate content
  const response = await googleAI.models.generateContent({
    model: config.model,
    contents: prompt,
    config: {
      systemInstruction: config.systemInstruction,
    },
  });

  return response.text ?? '';
}

/**
 * Generate AI commit message using multiple model fallbacks
 */
export async function generateMessage(params: GenerateAIMessageParams): Promise<string> {
  const { geminiApiKey } = params;
  const googleAI = new GoogleGenAI({ apiKey: geminiApiKey });

  for (const model of MODELS) {
    try {
      const config = createModelConfig(params, model);
      const response = await tryModel(googleAI, config, params);
      return response;
    } catch (error) {
      console.error(`Model ${model} failed: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
  }

  throw new Error('All models failed to generate a message');
}
