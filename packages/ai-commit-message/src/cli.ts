#!/usr/bin/env node
import { execSync } from 'child_process';
import { program } from 'commander';
import { kebabCase } from 'change-case';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
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
  try {
    // Check if we're in a git repository
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch (error) {
    console.error('Error: Not in a git repository');
    process.exit(1);
  }

  // Read the template file
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templatePath = join(__dirname, 'prepare-commit-msg.template.txt');
  let templateContent: string;

  try {
    templateContent = readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error('Error: Could not read template file');
    process.exit(1);
  }

  // Replace placeholders with actual values
  let hookContent = templateContent;

  // Build the ai-commit-message command with pattern and instruction
  let aiCommand = 'ai-commit-message';
  const args: string[] = [];

  if (pattern) {
    args.push(`--pattern "${pattern}"`);
  }

  if (instruction) {
    args.push(`--instruction "${instruction}"`);
  }

  if (args.length > 0) {
    aiCommand += ` ${args.join(' ')}`;
  }

  // Replace the ai-commit-message call in the template
  hookContent = hookContent.replace(
    /AI_MSG=\$\(ai-commit-message[^)]*\)/,
    `AI_MSG=\$(${aiCommand} 2>/dev/null)`
  );

  // Ensure .husky directory exists
  const huskyDir = '.husky';
  if (!existsSync(huskyDir)) {
    mkdirSync(huskyDir, { recursive: true });
  }

  // Write the hook file
  const hookPath = join(huskyDir, 'prepare-commit-msg');
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