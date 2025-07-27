/**
 * @type {import('cspell').CSpellSettings}
 */
export default {
  version: '0.2',
  language: 'en',
  useGitignore: true,
  dictionaryDefinitions: [{
    name: 'custom-words',
    path: './.cspell/custom-words.txt',
    addWords: true
  }],
  dictionaries: [
    'custom-words'
  ],
}