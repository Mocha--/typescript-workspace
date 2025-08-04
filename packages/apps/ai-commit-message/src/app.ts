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
  const gitInfo = getGitInfo();

  const params: GenerateAIMessageParams = {
    pattern: options.pattern ?? null,
    instruction: options.instruction ?? null,
    geminiApiKey: options.geminiApiKey,
    branchName: gitInfo.branchName,
    diff: gitInfo.diff,
    maxTokens: options.maxTokens ?? defaultMaxTokens,
  };

  return generateMessage(params);
}
