import type { z } from 'zod';

export type MockFallback<T> = () => T | Promise<T>;

export interface GenerateTextArgs {
  system: string;
  prompt: string;
  maxTokens?: number;
  mock: MockFallback<string>;
}

export interface GenerateObjectArgs<TSchema extends z.ZodType> {
  system: string;
  prompt: string;
  schema: TSchema;
  maxTokens?: number;
  mock: MockFallback<z.output<TSchema>>;
}
