#!/usr/bin/env node
import { execSync } from 'child_process';
import { program } from 'commander';
import { kebabCase } from 'change-case';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import packageJson from '../package.json';
import { generateAIMessage } from './generate-ai-message';
import prepareCommitMsgTemplate from './prepare-commit-msg.template.txt';

const patternOptionKey = 'pattern';
const instructionOptionKey = 'instruction';
const installHookOptionKey = 'installHook';
const uninstallHookOptionKey = 'uninstallHook';
const maxTokensOptionKey = 'maxTokens';
const hookSignature = 'ai-commit-message-hook-v1-8f7d2e9a';

type CLIOptions = Record<
  | typeof patternOptionKey
  | typeof instructionOptionKey
  | typeof installHookOptionKey
  | typeof uninstallHookOptionKey
  | typeof maxTokensOptionKey,
  string
>;

const cliOptions: CLIOptions = program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)
  .option(`--${kebabCase(patternOptionKey)} <${kebabCase(patternOptionKey)}>`, 'if found in the branch name, then generate the message in the format of <pattern>: <commit message>')
  .option(`--${kebabCase(instructionOptionKey)} <${kebabCase(instructionOptionKey)}>`, 'instruction to use for the commit message')
  .option(`--${kebabCase(installHookOptionKey)}`, 'install the git hook; try to install to .husky first, if not found, then install to .git/hooks')
  .option(`--${kebabCase(uninstallHookOptionKey)}`, 'uninstall the git hook; try to uninstall from .husky first, if not found, then uninstall from .git/hooks')
  .option(`--${kebabCase(maxTokensOptionKey)} <${kebabCase(maxTokensOptionKey)}>`, 'max tokens to use for the commit message')
  .parse(process.argv)
  .opts();

const {pattern, instruction, installHook, uninstallHook, maxTokens} = cliOptions;

try {
  if (installHook) {
    installGitHook();
  } else if (uninstallHook) {
    uninstallGitHook();
  } else {
    const message = await generateCommitMessage();
    console.log(message);
  }
} catch (error) {
  console.error(error instanceof Error ? `❌ ${error.message}` : '❌ Unknown error');
  process.exit(1);
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
   * Determine the hooks directory
   */
  const gitRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  const huskyDir = resolve(gitRoot, '.husky');
  const gitHooksDir = resolve(gitRoot, '.git', 'hooks');
  const hooksDir = existsSync(huskyDir) ? huskyDir : gitHooksDir;
  const hookPath = resolve(hooksDir, 'prepare-commit-msg');

  /**
   * Check if hook already exists and it is not our hook
   */
  if (existsSync(hookPath) && !readFileSync(hookPath, 'utf8').includes(hookSignature)) {
    throw new Error(`A prepare-commit-msg hook already exists at ${hookPath}, please uninstall it first.`);
  }

  /**
   * Build the ai-commit-message command with pattern and instruction
   */
  const argsString = [
    pattern ? `--${kebabCase(patternOptionKey)} "${pattern}"` : null,
    instruction ? `--${kebabCase(instructionOptionKey)} "${instruction}"` : null,
    maxTokens ? `--${kebabCase(maxTokensOptionKey)} ${maxTokens}` : null,
  ].filter(arg => !!arg).join(' ');
  const aiCommand = ['aimsg', argsString].filter(elm => !!elm).join(' ');

  /**
   * Replace the following placeholders in the template:
   * - AI_COMMIT_MESSAGE_COMMAND
   * - HOOK_SIGNATURE
   */
  const hookContent = prepareCommitMsgTemplate
    .replace(/\$\{AI_COMMIT_MESSAGE_COMMAND\}/g, aiCommand)
    .replace(/\$\{HOOK_SIGNATURE\}/g, hookSignature);

  /**
   * Write the hook file
   */
  writeFileSync(hookPath, hookContent);

  /**
   * Make the hook executable
   */
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
  /**
   * Check both possible hook locations
   */
  const gitRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  const huskyHookPath = resolve(gitRoot, '.husky', 'prepare-commit-msg');
  const gitHookPath = resolve(gitRoot, '.git', 'hooks', 'prepare-commit-msg');
  const hookPath = existsSync(huskyHookPath)
    ? huskyHookPath
    : existsSync(gitHookPath)
      ? gitHookPath
      : null;

  if (hookPath) {
    /**
     * Check if this is our hook by looking for our signature
     */
    const hookContent = readFileSync(hookPath, 'utf8');
    const isOurHook = hookContent.includes(hookSignature);

    if (isOurHook) {
      execSync(`rm ${hookPath}`);
      console.log('✅ Git hook uninstalled successfully!');
      console.log(`📁 Removed from: ${hookPath}`);
    } else {
      console.log('❌ Found a prepare-commit-msg hook, but it does not appear to be our AI commit message hook.');
      console.log(`📁 Hook location: ${hookPath}`);
      console.log('💡 This might be another tool\'s hook. Please check the hook content manually before removing.');
    }
  } else {
    console.log('ℹ️ No git hook found to uninstall');
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
    maxTokens: maxTokens ? parseInt(maxTokens) : 10_000,
  });

  return aiMessage;
}
