#!/usr/bin/env node
import { execSync } from 'child_process';
import { createCommand } from 'commander';
import packageJson from '../package.json' with { type: 'json' };
import { generateAIMessage } from './generate-ai-message.ts';

const patternOptionKey = 'pattern';
const instructionOptionKey = 'instruction';

type CLIOptions = Record<
  | typeof patternOptionKey
  | typeof instructionOptionKey,
  string
>;

const cliOptions: CLIOptions = createCommand()
  .name('ai-commit-message')
  .description('Generate commit messages with AI from the current git diff and git branch name')
  .version(packageJson.version)
  .option(`--${patternOptionKey} <${patternOptionKey}>`, 'if found in the branch name, then generate the message in the format of <pattern>: <commit message>')
  .option(`--${instructionOptionKey} <${instructionOptionKey}>`, 'instruction to use for the commit message')
  .parse(process.argv)
  .opts();

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error('GEMINI_API_KEY is not set');
}

const branchName = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
const diff = execSync('git diff --staged', { encoding: 'utf-8' }).trim();

const {pattern, instruction} = cliOptions;

const aiMessage = await generateAIMessage({
  pattern,
  instruction,
  geminiApiKey,
  branchName,
  diff,
  maxTokens: 10_000,
});

console.log(aiMessage);
