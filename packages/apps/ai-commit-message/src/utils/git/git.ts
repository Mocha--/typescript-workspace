import { execSync } from 'node:child_process';

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
