#!/usr/bin/env node
import { execSync } from 'child_process';
import { program } from 'commander';
import { kebabCase } from 'change-case';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
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
  installGitHook();
} else if (uninstallHook) {
  uninstallGitHook();
} else {
  const message = await generateCommitMessage();
  console.log(message);
}

function installGitHook() {
  /**
   * Check if we're in a git repository
   */
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch (error) {
    throw new Error('Not in a git repository');
  }

  /**
   * Read the template file
   */
  const templatePath = resolve(dirname(fileURLToPath(import.meta.url)), 'prepare-commit-msg.template.txt');
  const templateContent = readFileSync(templatePath, 'utf8');

  /**
   * Build the ai-commit-message command with pattern and instruction
   */
  const argsString = [
    pattern ? `--${kebabCase(patternOptionKey)} "${pattern}"` : null,
    instruction ? `--${kebabCase(instructionOptionKey)} "${instruction}"` : null,
  ].filter(arg => !!arg).join(' ');
  const aiCommand = ['ai-commit-message', argsString].filter(elm => !!elm).join(' ');

  /**
   * Replace the AI_COMMIT_MESSAGE_COMMAND placeholder in the template
   */
  const hookContent = templateContent.replace(
    /\$\{AI_COMMIT_MESSAGE_COMMAND\}/g,
    aiCommand
  );

  // Ensure .husky directory exists
  const huskyDir = '.husky';
  if (!existsSync(huskyDir)) {
    mkdirSync(huskyDir, { recursive: true });
  }

  // Write the hook file
  const hookPath = resolve(huskyDir, 'prepare-commit-msg');
  writeFileSync(hookPath, hookContent);

  // Make the hook executable
  execSync(`chmod +x ${hookPath}`);

  console.log('✅ Git hook installed successfully!');
  console.log(`📁 Hook location: ${hookPath}`);
  if (pattern) {
    console.log(`🎯 Pattern: ${pattern}`);
  }
  if (instruction) {
    console.log(`📝 Instruction: ${instruction}`);
  }
}

function uninstallGitHook() {
  try {
    const hookPath = '.husky/prepare-commit-msg';
    if (existsSync(hookPath)) {
      execSync(`rm ${hookPath}`);
      console.log('✅ Git hook uninstalled successfully!');
    } else {
      console.log('ℹ️  No git hook found to uninstall');
    }
  } catch (error) {
    console.error('Error: Could not uninstall git hook');
    process.exit(1);
  }
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
