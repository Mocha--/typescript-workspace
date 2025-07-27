/**
 * @type {import('cspell').CSpellSettings}
 */
export default {
  version: '0.2',
  language: 'en',
  useGitignore: true,
  dictionaryDefinitions: [{
    name: 'custom-words',
    path: './.cspell/dictionaries/custom-words.txt',
    addWords: true
  }, {
    name: 'tech-words',
    path: './.cspell/dictionaries/tech-words.txt',
    addWords: true
  }],
  dictionaries: [
    'custom-words',
    'tech-words'
  ],
  ignorePaths: [
    'pnpm-lock.yaml',
  ]
}