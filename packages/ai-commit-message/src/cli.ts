#!/usr/bin/env node

import packageJson from '../package.json' with { type: 'json' };
import { createCommand } from 'commander';

const patternOptionKey = 'pattern';

type CLIOptions = Record<typeof patternOptionKey, string>;

const cliOptions: CLIOptions = createCommand()
  .name('ai-commit-message')
  .description('Generate commit messages with AI from the current git diff and git branch name')
  .version(packageJson.version)
  .option(`--${patternOptionKey} <${patternOptionKey}>`, 'Pattern to use for the commit message')
  .parse(process.argv)
  .opts();

console.log(cliOptions);
