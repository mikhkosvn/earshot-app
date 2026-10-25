import 'server-only';

import { ZodError, type z } from 'zod';

import { Prisma } from '@/generated/prisma/client';
import type { ActionResult } from '@/lib/action-result';

export class ActionError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function runAction<T>(
  fn: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (error) {
    if (error instanceof ActionError) {
      return { ok: false, error: error.message, status: error.status };
    }
    if (error instanceof ZodError) {
      return { ok: false, error: 'The data is not valid.', status: 422 };
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return { ok: false, error: 'The record does not exist.', status: 404 };
    }
    throw error;
  }
}

export const withValidation =
  <S extends z.ZodType, R>(schema: S, fn: (args: z.output<S>) => Promise<R>) =>
  (args: z.input<S>) =>
    fn(schema.parse(args));
