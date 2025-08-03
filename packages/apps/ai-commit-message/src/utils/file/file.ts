import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

/**
 * Read file content as string
 */
export function readFile(filePath: string): string {
  return readFileSync(filePath, 'utf8');
}

/**
 * Write content to file
 */
export function writeFile(filePath: string, content: string): void {
  writeFileSync(filePath, content);
}

/**
 * Check if file contains specific text
 */
export function fileContains(filePath: string, text: string): boolean {
  const content = readFile(filePath);
  return content.includes(text);
}

/**
 * Make a file executable
 */
export function makeExecutable(filePath: string): void {
  execSync(`chmod +x ${filePath}`);
}

/**
 * Remove a file
 */
export function removeFile(filePath: string): void {
  execSync(`rm ${filePath}`);
}
