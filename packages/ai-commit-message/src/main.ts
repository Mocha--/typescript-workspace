import { execSync } from 'child_process';
import { GoogleGenAI } from '@google/genai';

const ticketNamePattern = 'VS-{ticket-id}';

let diffResult = '';
try {
  // diffResult = execSync('git diff --staged', { encoding: 'utf-8' });
  diffResult = execSync('git diff', { encoding: 'utf-8' });
} catch (error) {
  console.error(error);
}

let gitBranchName = '';
try {
  gitBranchName = execSync('git branch --show-current', { encoding: 'utf-8' });
} catch (error) {
  console.error(error);
}

if (!diffResult) {
  console.log('No changes to commit');
  process.exit(0);
}

const googleAI = new GoogleGenAI({});

// [TODO]: specify the best practice for commit message length
const response = await googleAI.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: `git branch name is: ${gitBranchName} and changes are: ${diffResult}`,
  config: {
    systemInstruction: `write a git commit message and make it concise, always prefix the message with the ticket name and colon, the ticket name is in branch name, the pattern is ${ticketNamePattern}`,
  },
});

console.log(response.text);
