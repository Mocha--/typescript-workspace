/**
 * Creates a frequency map of words.
 */
function buildWordCountMap(words: string[]): Map<string, number> {
  return words.reduce((acc, word) => {
    acc.set(word, (acc.get(word) || 0) + 1);
    return acc;
  }, new Map<string, number>());
}

/**
 * Adds a word to the sliding window and updates the match count.
 * Returns the new match count.
 */
function addWordToWindow(
  word: string,
  windowCount: Map<string, number>,
  wordCount: Map<string, number>,
  currentMatchCount: number
): number {
  const count = (windowCount.get(word) || 0) + 1;
  windowCount.set(word, count);

  // Update match count based on whether this word now matches its expected frequency
  if (count === wordCount.get(word)) {
    return currentMatchCount + 1;
  } else if (count === wordCount.get(word)! + 1) {
    // We exceeded the expected count, so it no longer matches
    return currentMatchCount - 1;
  }
  return currentMatchCount;
}

/**
 * Removes a word from the sliding window and updates the match count.
 * Returns the new match count.
 */
function removeWordFromWindow(
  word: string,
  windowCount: Map<string, number>,
  wordCount: Map<string, number>,
  currentMatchCount: number
): number {
  const count = windowCount.get(word)!;
  windowCount.set(word, count - 1);

  // Update match count
  if (count === wordCount.get(word)) {
    // It no longer matches
    return currentMatchCount - 1;
  } else if (count === wordCount.get(word)! + 1) {
    // It now matches again (was over, now at correct count)
    return currentMatchCount + 1;
  }

  // Clean up if count reaches zero
  if (windowCount.get(word) === 0) {
    windowCount.delete(word);
  }
  return currentMatchCount;
}

/**
 * Resets the sliding window to an empty state.
 */
function resetWindow(
  windowCount: Map<string, number>,
  right: number
): { newLeft: number; newMatchCount: number } {
  windowCount.clear();
  return { newLeft: right, newMatchCount: 0 };
}

/**
 * Configuration for processing an offset pass.
 */
interface ProcessPassConfig {
  s: string;
  offset: number;
  wordLen: number;
  totalLen: number;
  wordCount: Map<string, number>;
}

/**
 * Processes a single pass for a given offset.
 * Each pass handles starting positions aligned modulo wordLen.
 */
function processOffsetPass(config: ProcessPassConfig): number[] {
  const { s, offset, wordLen, totalLen, wordCount } = config;
  const windowCount = new Map<string, number>();
  let left = offset;
  let right = offset;
  let matchCount = 0;
  const results: number[] = [];

  while (right + wordLen <= s.length) {
    const word = s.substring(right, right + wordLen);
    right += wordLen;

    // If invalid word, reset window since we can't form valid concatenated string
    if (!wordCount.has(word)) {
      const reset = resetWindow(windowCount, right);
      left = reset.newLeft;
      matchCount = reset.newMatchCount;
      continue;
    }

    // Add word to window
    matchCount = addWordToWindow(word, windowCount, wordCount, matchCount);

    // Shrink window from left if it's too large
    while (right - left > totalLen) {
      const leftWord = s.substring(left, left + wordLen);
      left += wordLen;

      if (wordCount.has(leftWord)) {
        matchCount = removeWordFromWindow(
          leftWord,
          windowCount,
          wordCount,
          matchCount
        );
      }
    }

    // Check if current window is valid
    if (right - left === totalLen && matchCount === wordCount.size) {
      results.push(left);
    }
  }

  return results;
}

/**
 * Finds all starting indices of concatenated substrings in s.
 *
 * A concatenated string is formed by concatenating all words from any permutation of words.
 *
 * Optimized using sliding window technique with multiple passes.
 *
 * @param s - The string to search in
 * @param words - Array of strings of the same length
 * @returns Array of starting indices where concatenated substrings begin
 */
export function findSubstring(s: string, words: string[]): number[] {
  if (words.length === 0 || s.length === 0) {
    return [];
  }

  const wordLen = words[0].length;
  const totalLen = wordLen * words.length;

  if (s.length < totalLen) {
    return [];
  }

  const wordCount = buildWordCountMap(words);
  // Use sliding window with multiple passes for different alignments
  // Each pass handles starting positions that are aligned modulo wordLen
  const result = Array.from({ length: wordLen }, (_, offset) =>
    processOffsetPass({
      s,
      offset,
      wordLen,
      totalLen,
      wordCount,
    })
  ).reduce((acc, passResults) => acc.concat(passResults), []);

  return result;
}
