import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { kebabCase } from 'change-case';
import prepareCommitMsgTemplate from './prepare-commit-msg.template.txt';
import { getGitInfo, type HookLocation } from '../git';
import { fileContains, makeExecutable, removeFile, writeFile } from '../file';

const HOOK_SIGNATURE = 'ai-commit-message-hook-v1-8f7d2e9a';
const PATTERN_OPTION_KEY = 'pattern';
const INSTRUCTION_OPTION_KEY = 'instruction';
const MAX_TOKENS_OPTION_KEY = 'maxTokens';

interface HookOptions {
  pattern?: string;
  instruction?: string;
  maxTokens?: number;
}

/**
 * Build hook content with placeholders replaced
 */
function buildHookContent(options: HookOptions): string {
  const argsString = [
    options.pattern ? `--${kebabCase(PATTERN_OPTION_KEY)} "${options.pattern}"` : null,
    options.instruction ? `--${kebabCase(INSTRUCTION_OPTION_KEY)} "${options.instruction}"` : null,
    options.maxTokens ? `--${kebabCase(MAX_TOKENS_OPTION_KEY)} ${options.maxTokens.toString()}` : null,
  ].filter((arg) => Boolean(arg)).join(' ');

  const aiCommand = ['aimsg', argsString].filter((elm) => Boolean(elm)).join(' ');

  return prepareCommitMsgTemplate
    .replace(/\$\{AI_COMMIT_MESSAGE_COMMAND\}/g, aiCommand)
    .replace(/\$\{HOOK_SIGNATURE\}/g, HOOK_SIGNATURE);
}

/**
 * Log installation success
 */
function logInstallationSuccess(hookLocation: HookLocation, options: HookOptions): void {
  // eslint-disable-next-line no-console
  console.warn('✅ Git hook installed successfully!');
  // eslint-disable-next-line no-console
  console.warn(`📁 Hook location: ${hookLocation.hookPath}`);

  if (options.pattern) {
    // eslint-disable-next-line no-console
    console.warn(`🎯 Pattern: ${options.pattern}`);
  }

  if (options.instruction) {
    // eslint-disable-next-line no-console
    console.warn(`📝 Instruction: ${options.instruction}`);
  }
}

/**
 * Install git hook
 */
export function installGitHook(options: HookOptions): void {
  const gitInfo = getGitInfo();
  const hookLocation = getHookLocation(gitInfo.gitRoot);

  // Check if hook already exists and it is not our hook
  if (hookExists(hookLocation.hookPath)
    && !fileContains(hookLocation.hookPath, HOOK_SIGNATURE)) {
    throw new Error(`A prepare-commit-msg hook already exists at ${hookLocation.hookPath}, please uninstall it first.`);
  }

  const hookContent = buildHookContent(options);
  writeFile(hookLocation.hookPath, hookContent);
  makeExecutable(hookLocation.hookPath);

  logInstallationSuccess(hookLocation, options);
}

/**
 * Uninstall git hook
 */
export function uninstallGitHook(): void {
  const gitInfo = getGitInfo();
  const hookLocation = getHookLocation(gitInfo.gitRoot);

  if (hookExists(hookLocation.hookPath)) {
    const isOurHook = fileContains(hookLocation.hookPath, HOOK_SIGNATURE);

    if (isOurHook) {
      removeFile(hookLocation.hookPath);
      // eslint-disable-next-line no-console
      console.warn('✅ Git hook uninstalled successfully!');
      // eslint-disable-next-line no-console
      console.warn(`📁 Removed from: ${hookLocation.hookPath}`);
    } else {
      // eslint-disable-next-line no-console
      console.warn('❌ Found a prepare-commit-msg hook, but it does not appear to be our AI commit message hook.');
      // eslint-disable-next-line no-console
      console.warn(`📁 Hook location: ${hookLocation.hookPath}`);
      // eslint-disable-next-line no-console
      console.warn('💡 This might be another tool\'s hook. Please check the hook content manually before removing.');
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('ℹ️ No git hook found to uninstall');
  }
}

/**
 * Determine the hooks directory and path
 */
export function getHookLocation(gitRoot: string): HookLocation {
  const huskyDir = resolve(gitRoot, '.husky');
  const gitHooksDir = resolve(gitRoot, '.git', 'hooks');
  const isHusky = existsSync(huskyDir);
  const hooksDir = isHusky ? huskyDir : gitHooksDir;
  const hookPath = resolve(hooksDir, 'prepare-commit-msg');

  return { hooksDir, hookPath, isHusky };
}

/**
 * Check if a hook exists at the given path
 */
export function hookExists(hookPath: string): boolean {
  return existsSync(hookPath);
}
