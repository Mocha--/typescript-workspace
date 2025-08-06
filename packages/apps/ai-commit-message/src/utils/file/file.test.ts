import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { readFile, writeFile, fileContains, makeExecutable, removeFile } from './file.js';

// Mock the fs module
vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

// Mock the child_process module
vi.mock('node:child_process', () => ({
  execSync: vi.fn(),
}));

describe('File Module', () => {
  const mockReadFileSync = readFileSync as vi.MockedFunction<typeof readFileSync>;
  const mockWriteFileSync = writeFileSync as vi.MockedFunction<typeof writeFileSync>;
  const mockExecSync = execSync as vi.MockedFunction<typeof execSync>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('readFile', () => {
    it('should read file content as string', () => {
      const filePath = '/path/to/file.txt';
      const expectedContent = 'Hello, World!';

      mockReadFileSync.mockReturnValue(expectedContent);

      const result = readFile(filePath);

      expect(result).toBe(expectedContent);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should handle empty file content', () => {
      const filePath = '/path/to/empty.txt';
      const expectedContent = '';

      mockReadFileSync.mockReturnValue(expectedContent);

      const result = readFile(filePath);

      expect(result).toBe(expectedContent);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should handle file with special characters', () => {
      const filePath = '/path/to/file with spaces.txt';
      const expectedContent = 'Content with émojis 🚀 and special chars: !@#$%^&*()';

      mockReadFileSync.mockReturnValue(expectedContent);

      const result = readFile(filePath);

      expect(result).toBe(expectedContent);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should handle file with newlines', () => {
      const filePath = '/path/to/multiline.txt';
      const expectedContent = 'Line 1\nLine 2\nLine 3';

      mockReadFileSync.mockReturnValue(expectedContent);

      const result = readFile(filePath);

      expect(result).toBe(expectedContent);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });
  });

  describe('writeFile', () => {
    it('should write content to file', () => {
      const filePath = '/path/to/output.txt';
      const content = 'Hello, World!';

      writeFile(filePath, content);

      expect(mockWriteFileSync).toHaveBeenCalledWith(filePath, content);
    });

    it('should handle empty content', () => {
      const filePath = '/path/to/empty.txt';
      const content = '';

      writeFile(filePath, content);

      expect(mockWriteFileSync).toHaveBeenCalledWith(filePath, content);
    });

    it('should handle content with special characters', () => {
      const filePath = '/path/to/special.txt';
      const content = 'Content with émojis 🚀 and special chars: !@#$%^&*()';

      writeFile(filePath, content);

      expect(mockWriteFileSync).toHaveBeenCalledWith(filePath, content);
    });

    it('should handle content with newlines', () => {
      const filePath = '/path/to/multiline.txt';
      const content = 'Line 1\nLine 2\nLine 3';

      writeFile(filePath, content);

      expect(mockWriteFileSync).toHaveBeenCalledWith(filePath, content);
    });

    it('should handle file path with spaces', () => {
      const filePath = '/path/with spaces/file.txt';
      const content = 'Content for file with spaces';

      writeFile(filePath, content);

      expect(mockWriteFileSync).toHaveBeenCalledWith(filePath, content);
    });
  });

  describe('fileContains', () => {
    it('should return true when file contains the specified text', () => {
      const filePath = '/path/to/file.txt';
      const searchText = 'Hello';
      const fileContent = 'Hello, World! This is a test file.';

      mockReadFileSync.mockReturnValue(fileContent);

      const result = fileContains(filePath, searchText);

      expect(result).toBe(true);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should return false when file does not contain the specified text', () => {
      const filePath = '/path/to/file.txt';
      const searchText = 'Goodbye';
      const fileContent = 'Hello, World! This is a test file.';

      mockReadFileSync.mockReturnValue(fileContent);

      const result = fileContains(filePath, searchText);

      expect(result).toBe(false);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should handle case-sensitive search', () => {
      const filePath = '/path/to/file.txt';
      const searchText = 'hello';
      const fileContent = 'Hello, World! This is a test file.';

      mockReadFileSync.mockReturnValue(fileContent);

      const result = fileContains(filePath, searchText);

      expect(result).toBe(false); // Case-sensitive search
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should handle empty search text', () => {
      const filePath = '/path/to/file.txt';
      const searchText = '';
      const fileContent = 'Hello, World! This is a test file.';

      mockReadFileSync.mockReturnValue(fileContent);

      const result = fileContains(filePath, searchText);

      expect(result).toBe(true); // Empty string is always contained
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should handle empty file content', () => {
      const filePath = '/path/to/empty.txt';
      const searchText = 'Hello';
      const fileContent = '';

      mockReadFileSync.mockReturnValue(fileContent);

      const result = fileContains(filePath, searchText);

      expect(result).toBe(false);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });

    it('should handle search text that matches exactly', () => {
      const filePath = '/path/to/file.txt';
      const searchText = 'Hello, World!';
      const fileContent = 'Hello, World! This is a test file.';

      mockReadFileSync.mockReturnValue(fileContent);

      const result = fileContains(filePath, searchText);

      expect(result).toBe(true);
      expect(mockReadFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    });
  });

  describe('makeExecutable', () => {
    it('should make a file executable', () => {
      const filePath = '/path/to/script.sh';

      makeExecutable(filePath);

      expect(mockExecSync).toHaveBeenCalledWith('chmod +x /path/to/script.sh');
    });

    it('should handle file path with spaces', () => {
      const filePath = '/path/with spaces/script.sh';

      makeExecutable(filePath);

      expect(mockExecSync).toHaveBeenCalledWith('chmod +x /path/with spaces/script.sh');
    });

    it('should handle file path with special characters', () => {
      const filePath = '/path/to/script-v2.1.sh';

      makeExecutable(filePath);

      expect(mockExecSync).toHaveBeenCalledWith('chmod +x /path/to/script-v2.1.sh');
    });
  });

  describe('removeFile', () => {
    it('should remove a file', () => {
      const filePath = '/path/to/file.txt';

      removeFile(filePath);

      expect(mockExecSync).toHaveBeenCalledWith('rm /path/to/file.txt');
    });

    it('should handle file path with spaces', () => {
      const filePath = '/path/with spaces/file.txt';

      removeFile(filePath);

      expect(mockExecSync).toHaveBeenCalledWith('rm /path/with spaces/file.txt');
    });

    it('should handle file path with special characters', () => {
      const filePath = '/path/to/file-v2.1.txt';

      removeFile(filePath);

      expect(mockExecSync).toHaveBeenCalledWith('rm /path/to/file-v2.1.txt');
    });
  });
});
