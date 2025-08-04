import { execSync } from 'node:child_process';

export interface GitInfo {
  branchName: string;
  diff: string;
  gitRoot: string;
}

/**
 * Get current git branch name
 */
function getGitBranchName(): string {
  return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
}

/**
 * Get staged git diff
 */
function getGitStagedDiff(): string {
  return execSync('git diff --staged', { encoding: 'utf-8' }).trim();
}

/**
 * Get git repository root
 */
function getGitRoot(): string {
  return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
}

/**
 * Check if current directory is a git repository
 */
function isGitRepository(): boolean {
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

  const branchName = getGitBranchName();
  const diff = getGitStagedDiff();
  const gitRoot = getGitRoot();
  return { branchName, diff, gitRoot };
}
