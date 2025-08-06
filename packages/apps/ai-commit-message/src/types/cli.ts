import * as z from 'zod/mini';

export const cliOptionsSchema = z.object({
  pattern: z.optional(z.string()),
  instruction: z.optional(z.string()),
  installHook: z.optional(z.boolean()),
  uninstallHook: z.optional(z.boolean()),
  maxTokens: z.optional(
    z.pipe(
      z.string(),
      z.transform((val) => parseInt(val, 10)),
    ).check(
      z.gt(0, 'maxTokens must be a positive number'),
    ),
  ),
});

export type CliOptions = z.infer<typeof cliOptionsSchema>;
