#!/usr/bin/env node

import packageJson from '../package.json' with { type: 'json' };
import { createCommand } from 'commander';

const command = createCommand();

command
  .name('ai-commit-message')
  .description('Generate commit messages using AI')
  .version(packageJson.version)
  .option('-m, --message <msg>', 'Commit message to analyze')

command.parse(process.argv);
const options = command.opts();

console.log(options);
