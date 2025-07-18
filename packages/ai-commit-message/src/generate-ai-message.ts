import { GoogleGenAI } from '@google/genai';

export interface GenerateAIMessageParams {
  pattern: string | null;
  branchName: string | null;
  diff: string | null;
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

  const model = 'gemini-2.5-flash';
  const prompt = `git branch name is: ${branchName} and changes are: ${diff}`;
  const googleAI = new GoogleGenAI({
    apiKey: geminiApiKey,
  });

  /**
   * check if the prompt is too long
   */
  const { totalTokens } = await googleAI.models.countTokens({
    model,
    contents: prompt,
  });

  if ((totalTokens ?? Infinity) > maxTokens) {
    throw new Error('Total tokens exceed the limit')
  }

  /**
   * send the prompt to the AI model and get the response
   */
  const response = await googleAI.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: `write a git commit message less than 72 characters. If the pattern ${pattern} can be found in the branch name, then prefix the message in the format of <pattern>:. Do not capitalize the first letter of the message. ${instruction}`,
    },
  });

  return response.text;
}
