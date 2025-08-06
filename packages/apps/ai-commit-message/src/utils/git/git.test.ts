import { execSync } from 'node:child_process';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGitInfo } from './git.js';

// Mock the child_process module
vi.mock('node:child_process', () => ({
  execSync: vi.fn(),
}));

describe('git module', () => {
  const mockExecSync = execSync as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getGitInfo', () => {
    it('should return git information when in a git repository', () => {
      // Mock isGitRepository to return true
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          return '.git';
        }
        if (command === 'git branch --show-current') {
          return 'feature/add-new-feature';
        }
        if (command === 'git diff --staged') {
          return 'diff --git a/file.ts b/file.ts\nindex 1234567..abcdefg 100644\n--- a/file.ts\n+++ b/file.ts\n@@ -1,3 +1,4 @@\n+console.log("new line");';
        }
        if (command === 'git rev-parse --show-toplevel') {
          return '/path/to/git/repo';
        }
        throw new Error(`Unexpected command: ${command}`);
      });

      const result = getGitInfo();

      expect(result).toEqual({
        branchName: 'feature/add-new-feature',
        diff: 'diff --git a/file.ts b/file.ts\nindex 1234567..abcdefg 100644\n--- a/file.ts\n+++ b/file.ts\n@@ -1,3 +1,4 @@\n+console.log("new line");',
        gitRoot: '/path/to/git/repo',
      });
    });

    it('should throw error when not in a git repository', () => {
      // Mock isGitRepository to return false
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          throw new Error('Not a git repository');
        }
        throw new Error('Unexpected command');
      });

      expect(() => getGitInfo()).toThrow('Not in a git repository');
    });

    it('should handle empty git diff', () => {
      // Mock isGitRepository to return true
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          return '.git';
        }
        if (command === 'git branch --show-current') {
          return 'main';
        }
        if (command === 'git diff --staged') {
          return '';
        }
        if (command === 'git rev-parse --show-toplevel') {
          return '/path/to/git/repo';
        }
        throw new Error(`Unexpected command: ${command}`);
      });

      const result = getGitInfo();

      expect(result).toEqual({
        branchName: 'main',
        diff: '',
        gitRoot: '/path/to/git/repo',
      });
    });

    it('should handle whitespace-only git diff', () => {
      // Mock isGitRepository to return true
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          return '.git';
        }
        if (command === 'git branch --show-current') {
          return 'develop';
        }
        if (command === 'git diff --staged') {
          return '   \n  \t  \n';
        }
        if (command === 'git rev-parse --show-toplevel') {
          return '/path/to/git/repo';
        }
        throw new Error(`Unexpected command: ${command}`);
      });

      const result = getGitInfo();

      expect(result).toEqual({
        branchName: 'develop',
        diff: '', // .trim() removes all whitespace
        gitRoot: '/path/to/git/repo',
      });
    });

    it('should handle branch name with special characters', () => {
      // Mock isGitRepository to return true
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          return '.git';
        }
        if (command === 'git branch --show-current') {
          return 'feature/user-authentication-v2.1';
        }
        if (command === 'git diff --staged') {
          return 'diff --git a/auth.ts b/auth.ts\nindex 1234567..abcdefg 100644\n--- a/auth.ts\n+++ b/auth.ts\n@@ -1,3 +1,4 @@\n+export const auth = true;';
        }
        if (command === 'git rev-parse --show-toplevel') {
          return '/path/to/git/repo';
        }
        throw new Error(`Unexpected command: ${command}`);
      });

      const result = getGitInfo();

      expect(result).toEqual({
        branchName: 'feature/user-authentication-v2.1',
        diff: 'diff --git a/auth.ts b/auth.ts\nindex 1234567..abcdefg 100644\n--- a/auth.ts\n+++ b/auth.ts\n@@ -1,3 +1,4 @@\n+export const auth = true;',
        gitRoot: '/path/to/git/repo',
      });
    });

    it('should handle git root path with spaces', () => {
      // Mock isGitRepository to return true
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          return '.git';
        }
        if (command === 'git branch --show-current') {
          return 'feature/test';
        }
        if (command === 'git diff --staged') {
          return 'diff --git a/test.ts b/test.ts\nindex 1234567..abcdefg 100644\n--- a/test.ts\n+++ b/test.ts\n@@ -1,3 +1,4 @@\n+console.log("test");';
        }
        if (command === 'git rev-parse --show-toplevel') {
          return '/path/with spaces/to/git/repo';
        }
        throw new Error(`Unexpected command: ${command}`);
      });

      const result = getGitInfo();

      expect(result).toEqual({
        branchName: 'feature/test',
        diff: 'diff --git a/test.ts b/test.ts\nindex 1234567..abcdefg 100644\n--- a/test.ts\n+++ b/test.ts\n@@ -1,3 +1,4 @@\n+console.log("test");',
        gitRoot: '/path/with spaces/to/git/repo',
      });
    });
  });

  describe('isGitRepository', () => {
    it('should return true when in a git repository', () => {
      mockExecSync.mockReturnValue('.git');

      // We need to test the internal function indirectly through getGitInfo
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          return '.git';
        }
        if (command === 'git branch --show-current') {
          return 'main';
        }
        if (command === 'git diff --staged') {
          return 'diff content';
        }
        if (command === 'git rev-parse --show-toplevel') {
          return '/path/to/repo';
        }
        throw new Error('Unexpected command');
      });

      expect(() => getGitInfo()).not.toThrow();
    });

    it('should return false when not in a git repository', () => {
      mockExecSync.mockImplementation((command: string) => {
        if (command === 'git rev-parse --git-dir') {
          throw new Error('Not a git repository');
        }
        throw new Error('Unexpected command');
      });

      expect(() => getGitInfo()).toThrow('Not in a git repository');
    });
  });
});
