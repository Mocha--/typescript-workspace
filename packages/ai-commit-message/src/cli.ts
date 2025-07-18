#!/usr/bin/env node

import packageJson from '../package.json' with { type: 'json' };
import { createCommand } from 'commander';

const patternOptionKey = 'pattern';
const instructionOptionKey = 'instruction';

type CLIOptions = Record<typeof patternOptionKey | typeof instructionOptionKey, string>;

const cliOptions: CLIOptions = createCommand()
  .name('ai-commit-message')
  .description('Generate commit messages with AI from the current git diff and git branch name')
  .version(packageJson.version)
  .option(`--${patternOptionKey} <${patternOptionKey}>`, 'if found in the branch name, then generate the message in the format of <pattern>: <commit message>')
  .option(`--${instructionOptionKey} <${instructionOptionKey}>`, 'instruction to use for the commit message')
  .parse(process.argv)
  .opts();

console.log(cliOptions);
