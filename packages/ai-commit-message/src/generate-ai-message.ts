import { GoogleGenAI } from '@google/genai';

export interface GenerateAIMessageParams {
  pattern: string | null;
  branchName: string;
  diff: string;
  geminiApiKey: string;
  maxTokens: number;
  instruction: string | null;
}

export async function generateAIMessage(params: GenerateAIMessageParams) {
  const {
    pattern,
    branchName,
    diff,
    geminiApiKey,
    maxTokens,
    instruction,
  } = params;

  /**
   * model candidates in case rate limit is hit
   */
  const models = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'];
  const prompt = `git branch name is: ${branchName} and changes are: ${diff}`;
  const googleAI = new GoogleGenAI({
    apiKey: geminiApiKey,
  });

  for (const model of models) {
    try {
      /**
       * check if the prompt is too long
       */
      const { totalTokens } = await googleAI.models.countTokens({
        model,
        contents: prompt,
      });

      if ((totalTokens ?? Infinity) > maxTokens) {
        throw new Error('Total tokens exceed the limit');
      }

      const systemInstruction = [
        'write a git commit message less than 72 characters.',
        'Do not capitalize the first letter of the message.',
        pattern ? `If the pattern ${pattern} can be found in the branch name, then prefix the message in the format of <pattern>:.` : null,
        instruction ? ` ${instruction}` : null,
      ]
        .filter((elm) => Boolean(elm))
        .join(' ');

      /**
       * send the prompt to the AI model and get the response
       */
      const response = await googleAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      return response.text;
    } catch (error) {
      console.error(`model ${model} failed to generate a message ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
  }

  throw new Error('All models failed to generate a message');
}
