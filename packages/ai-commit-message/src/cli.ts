#!/usr/bin/env node
import { execSync } from 'child_process';
import { program } from 'commander';
import { kebabCase } from 'change-case';
import packageJson from '../package.json' with { type: 'json' };
import { generateAIMessage } from './generate-ai-message.ts';

const patternOptionKey = 'pattern';
const instructionOptionKey = 'instruction';
const installHookOptionKey = 'installHook';
const uninstallHookOptionKey = 'uninstallHook';

type CLIOptions = Record<
  | typeof patternOptionKey
  | typeof instructionOptionKey
  | typeof installHookOptionKey
  | typeof uninstallHookOptionKey,
  string
>;

const cliOptions: CLIOptions = program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)
  .option(`--${kebabCase(patternOptionKey)} <${kebabCase(patternOptionKey)}>`, 'if found in the branch name, then generate the message in the format of <pattern>: <commit message>')
  .option(`--${kebabCase(instructionOptionKey)} <${kebabCase(instructionOptionKey)}>`, 'instruction to use for the commit message')
  .option(`--${kebabCase(installHookOptionKey)}`, 'install the git hook')
  .option(`--${kebabCase(uninstallHookOptionKey)}`, 'uninstall the git hook')
  .parse(process.argv)
  .opts();

const {pattern, instruction, installHook, uninstallHook} = cliOptions;

if (installHook) {
  console.log('install the git hook');
} else if (uninstallHook) {
  console.log('uninstall the git hook');
} else {
  const message = await generateCommitMessage();
  console.log(message);
}

async function generateCommitMessage() {
  const branchName = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
  const diff = execSync('git diff --staged', { encoding: 'utf-8' }).trim();
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!diff) {
    throw new Error('No staged changes found');
  }

  if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const aiMessage = await generateAIMessage({
    pattern,
    instruction,
    geminiApiKey,
    branchName,
    diff,
    maxTokens: 10_000,
  });

  return aiMessage;
}