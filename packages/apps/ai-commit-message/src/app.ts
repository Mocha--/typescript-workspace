import { type GenerateAIMessageParams, generateMessage, getGitInfo } from './utils';

export interface GenerateGitCommitMessageOptions {
  geminiApiKey: string;
  pattern?: string;
  instruction?: string;
  maxTokens?: number;
}

/**
 * Generate commit message using AI
 */
export async function generateGitCommitMessage(options: GenerateGitCommitMessageOptions): Promise<string> {
  const defaultMaxTokens = 10_000;
  const { branchName, diff } = getGitInfo();

  if (!diff) {
    throw new Error('No staged changes found');
  }

  const params: GenerateAIMessageParams = {
    diff,
    branchName,
    pattern: options.pattern ?? null,
    instruction: options.instruction ?? null,
    geminiApiKey: options.geminiApiKey,
    maxTokens: options.maxTokens ?? defaultMaxTokens,
  };

  return generateMessage(params);
}
