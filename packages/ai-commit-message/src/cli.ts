#!/usr/bin/env node
import { execSync } from 'child_process';
import { createCommand } from 'commander';
import packageJson from '../package.json' with { type: 'json' };

const patternOptionKey = 'pattern';
const instructionOptionKey = 'instruction';
const maxTokensOptionKey = 'max-tokens';

type CLIOptions = Record<
  | typeof patternOptionKey
  | typeof instructionOptionKey
  | typeof maxTokensOptionKey,
  string
>;

const cliOptions: CLIOptions = createCommand()
  .name('ai-commit-message')
  .description('Generate commit messages with AI from the current git diff and git branch name')
  .version(packageJson.version)
  .option(`--${patternOptionKey} <${patternOptionKey}>`, 'if found in the branch name, then generate the message in the format of <pattern>: <commit message>')
  .option(`--${instructionOptionKey} <${instructionOptionKey}>`, 'instruction to use for the commit message')
  .option(`--${maxTokensOptionKey} <${maxTokensOptionKey}>`, 'max tokens to consume by AI model')
  .parse(process.argv)
  .opts();

const gitBranchName = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
const diffResult = execSync('git diff --staged', { encoding: 'utf-8' }).trim();

console.log(cliOptions);
