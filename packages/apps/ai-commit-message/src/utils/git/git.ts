import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export interface GitInfo {
  branchName: string;
  diff: string;
  gitRoot: string;
}

export interface HookLocation {
  hooksDir: string;
  hookPath: string;
  isHusky: boolean;
}

/**
 * Get current git branch name
 */
export function getCurrentBranch(): string {
  return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
}

/**
 * Get staged git diff
 */
export function getStagedDiff(): string {
  return execSync('git diff --staged', { encoding: 'utf-8' }).trim();
}

/**
 * Get git repository root
 */
export function getGitRoot(): string {
  return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
}

/**
 * Check if current directory is a git repository
 */
export function isGitRepository(): boolean {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get git information (branch name, diff, and root)
 */
export function getGitInfo(): GitInfo {
  if (!isGitRepository()) {
    throw new Error('Not in a git repository');
  }

  const branchName = getCurrentBranch();
  const diff = getStagedDiff();
  const gitRoot = getGitRoot();

  if (!diff) {
    throw new Error('No staged changes found');
  }

  return { branchName, diff, gitRoot };
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
