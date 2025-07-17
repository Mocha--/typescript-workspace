#!/usr/bin/env node

// Import any required modules here
// For a simple example, we'll use process.argv directly
// For more advanced CLI, consider using 'commander' or 'yargs'

function main(): void {
  const args: string[] = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`\nUsage: ai-commit-message [options]\n\nOptions:\n  -h, --help     Show help\n  -v, --version  Show version\n`);
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    // You can sync this with your package.json version if desired
    console.log('1.0.1');
    process.exit(0);
  }

  // Your main CLI logic here
  console.log('Hello from ai-commit-message CLI!');
}

main();
