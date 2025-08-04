#!/usr/bin/env node

import * as z from 'zod/mini';
import { program } from 'commander';
import { kebabCase } from 'change-case';
import packageJson from '../package.json';
import { generateGitCommitMessage } from './app';
import { installGitHook, uninstallGitHook } from './utils';
import { cliOptionsSchema } from './types';

// Main execution
async function main() {
  const patternOptionKey = 'pattern';
  const instructionOptionKey = 'instruction';
  const installHookOptionKey = 'installHook';
  const uninstallHookOptionKey = 'uninstallHook';
  const maxTokensOptionKey = 'maxTokens';

  try {
    /**
     * Parse CLI options
     */
    const rawCliOptions = program
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

    const {
      error: parseCliOptionsError,
      data: cliOptions,
    } = z.safeParse(cliOptionsSchema, rawCliOptions);

    if (parseCliOptionsError) {
      throw new Error(parseCliOptionsError.message);
    }

    if (cliOptions.installHook) {
      installGitHook({
        pattern: cliOptions.pattern,
        instruction: cliOptions.instruction,
        maxTokens: cliOptions.maxTokens,
      });
      return;
    }

    if (cliOptions.uninstallHook) {
      uninstallGitHook();
      return;
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const result = await generateGitCommitMessage({
      geminiApiKey,
      pattern: cliOptions.pattern,
      instruction: cliOptions.instruction,
      maxTokens: cliOptions.maxTokens,
    });

    if (result) {
      // eslint-disable-next-line no-console
      console.log(result);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error instanceof Error ? `❌ ${error.message}` : '❌ Unknown error');
  }
}

void main();
