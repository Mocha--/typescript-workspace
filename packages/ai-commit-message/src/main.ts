import { execSync } from 'child_process';
import { GoogleGenAI } from '@google/genai';

const ticketNamePattern = 'VS-{ticket-id}';
const gitBranchName = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
const diffResult = execSync('git diff --staged', { encoding: 'utf-8' }).trim();

const googleAI = new GoogleGenAI({});
const response = await googleAI.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: `git branch name is: ${gitBranchName} and changes are: ${diffResult}`,
  config: {
    systemInstruction: `write a git commit message less than 72 characters; if the ticket name with the pattern ${ticketNamePattern} can be found in the branch name, then prefix the message in the format of <ticket-name>:. Do not capitalize the first letter of the message.`,
  },
});

console.log(response.text);
