#!/usr/bin/env node

import packageJson from '../package.json' with { type: 'json' };
import { createCommand } from 'commander';

const options = createCommand()
  .name('ai-commit-message')
  .description('Generate commit messages using AI based on the current git diff')
  .version(packageJson.version)
  .option('-m, --message <msg>', 'Commit message to analyze')
  .parse(process.argv)
  .opts();

console.log(options);
