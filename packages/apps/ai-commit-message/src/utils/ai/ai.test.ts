import { GoogleGenAI } from '@google/genai';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateMessage, type GenerateAIMessageParams } from './ai.js';

// Mock the GoogleGenAI module
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(),
}));

describe('ai module', () => {
  let mockGoogleAI: { models: { countTokens: ReturnType<typeof vi.fn>; generateContent: ReturnType<typeof vi.fn> } };
  let mockModel: { countTokens: ReturnType<typeof vi.fn>; generateContent: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Create mock model instance
    mockModel = {
      countTokens: vi.fn(),
      generateContent: vi.fn(),
    };

    // Create mock GoogleAI instance
    mockGoogleAI = {
      models: mockModel,
    };

    // Mock the GoogleGenAI constructor
    (GoogleGenAI as ReturnType<typeof vi.fn>).mockImplementation(() => mockGoogleAI);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateMessage', () => {
    const baseParams: GenerateAIMessageParams = {
      pattern: null,
      branchName: 'feature/add-new-feature',
      diff: 'Added new functionality to the application',
      geminiApiKey: 'test-api-key',
      maxTokens: 1000,
      instruction: null,
    };

    it('should successfully generate a message with the first model', async () => {
      // Mock successful token count
      mockModel.countTokens.mockResolvedValue({ totalTokens: 500 });

      // Mock successful content generation
      mockModel.generateContent.mockResolvedValue({
        text: 'add new functionality to the application',
      });

      const result = await generateMessage(baseParams);

      expect(result).toBe('add new functionality to the application');
      expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
      expect(mockModel.countTokens).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash',
        contents: 'git branch name is: feature/add-new-feature and changes are: Added new functionality to the application',
      });
      expect(mockModel.generateContent).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash',
        contents: 'git branch name is: feature/add-new-feature and changes are: Added new functionality to the application',
        config: {
          systemInstruction: 'write a git commit message less than 72 characters. Do not capitalize the first letter of the message.',
        },
      });
    });

    it('should fallback to second model when first model fails', async () => {
      // Mock first model failure
      mockModel.countTokens
        .mockRejectedValueOnce(new Error('Model unavailable'))
        .mockResolvedValueOnce({ totalTokens: 500 });

      // Mock successful content generation for second model
      mockModel.generateContent.mockResolvedValue({
        text: 'fix bug in authentication system',
      });

      const result = await generateMessage(baseParams);

      expect(result).toBe('fix bug in authentication system');
      expect(mockModel.countTokens).toHaveBeenCalledTimes(2);
      expect(mockModel.countTokens).toHaveBeenNthCalledWith(1, {
        model: 'gemini-2.5-flash',
        contents: 'git branch name is: feature/add-new-feature and changes are: Added new functionality to the application',
      });
      expect(mockModel.countTokens).toHaveBeenNthCalledWith(2, {
        model: 'gemini-2.5-pro',
        contents: 'git branch name is: feature/add-new-feature and changes are: Added new functionality to the application',
      });
    });

    it('should throw error when all models fail', async () => {
      // Mock all models failing
      mockModel.countTokens.mockRejectedValue(new Error('All models unavailable'));

      await expect(generateMessage(baseParams)).rejects.toThrow('All models failed to generate a message');
      expect(mockModel.countTokens).toHaveBeenCalledTimes(3); // All three models
    });

    it('should handle token limit exceeded error', async () => {
      // Mock token count exceeding limit
      mockModel.countTokens.mockResolvedValue({ totalTokens: 2000 });

      await expect(generateMessage(baseParams)).rejects.toThrow('All models failed to generate a message');
    });

    it('should include pattern in system instruction when provided', async () => {
      const paramsWithPattern: GenerateAIMessageParams = {
        ...baseParams,
        pattern: 'feat',
      };

      mockModel.countTokens.mockResolvedValue({ totalTokens: 500 });
      mockModel.generateContent.mockResolvedValue({
        text: 'feat: add new functionality',
      });

      await generateMessage(paramsWithPattern);

      expect(mockModel.generateContent).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash',
        contents: 'git branch name is: feature/add-new-feature and changes are: Added new functionality to the application',
        config: {
          systemInstruction: 'write a git commit message less than 72 characters. Do not capitalize the first letter of the message. If the pattern feat can be found in the branch name, then prefix the message in the format of <pattern>:.',
        },
      });
    });

    it('should include custom instruction in system instruction when provided', async () => {
      const paramsWithInstruction: GenerateAIMessageParams = {
        ...baseParams,
        instruction: 'Use conventional commit format',
      };

      mockModel.countTokens.mockResolvedValue({ totalTokens: 500 });
      mockModel.generateContent.mockResolvedValue({
        text: 'feat: add new functionality',
      });

      await generateMessage(paramsWithInstruction);

      expect(mockModel.generateContent).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash',
        contents: 'git branch name is: feature/add-new-feature and changes are: Added new functionality to the application',
        config: {
          systemInstruction: 'write a git commit message less than 72 characters. Do not capitalize the first letter of the message.  Use conventional commit format',
        },
      });
    });

    it('should handle empty response text', async () => {
      mockModel.countTokens.mockResolvedValue({ totalTokens: 500 });
      mockModel.generateContent.mockResolvedValue({
        text: '',
      });

      const result = await generateMessage(baseParams);

      expect(result).toBe('');
    });

    it('should handle null response text', async () => {
      mockModel.countTokens.mockResolvedValue({ totalTokens: 500 });
      mockModel.generateContent.mockResolvedValue({
        text: null,
      });

      const result = await generateMessage(baseParams);

      expect(result).toBe('');
    });

    it('should handle undefined response text', async () => {
      mockModel.countTokens.mockResolvedValue({ totalTokens: 500 });
      mockModel.generateContent.mockResolvedValue({
        text: undefined,
      });

      const result = await generateMessage(baseParams);

      expect(result).toBe('');
    });

    it('should handle null totalTokens in countTokens response', async () => {
      // When totalTokens is null, it becomes Infinity and exceeds the limit
      mockModel.countTokens.mockResolvedValue({ totalTokens: null });

      await expect(generateMessage(baseParams)).rejects.toThrow('All models failed to generate a message');
    });

    it('should handle undefined totalTokens in countTokens response', async () => {
      // When totalTokens is undefined, it becomes Infinity and exceeds the limit
      mockModel.countTokens.mockResolvedValue({ totalTokens: undefined });

      await expect(generateMessage(baseParams)).rejects.toThrow('All models failed to generate a message');
    });
  });
});
