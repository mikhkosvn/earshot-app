import 'server-only';

import type { ZodError } from 'zod';

import { NON_FIELD_ERRORS_KEY } from '@/server/public-api/constants';
import type {
  FieldErrorBody,
  PublicApiErrorBody,
} from '@/server/public-api/types';

export const errorResponse = (status: number, body: PublicApiErrorBody) =>
  Response.json(body, { status });

export const detailErrorResponse = (
  status: number,
  detail: string,
  code?: string,
) => errorResponse(status, { detail, ...(code && { code }) });

export const fieldErrorResponse = (fields: FieldErrorBody, status = 400) =>
  errorResponse(status, fields);

export const nonFieldErrorResponse = (messages: string[], status = 400) =>
  errorResponse(status, { non_field_errors: messages });

export const zodErrorResponse = (error: ZodError, status = 400) => {
  const fields: FieldErrorBody = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join('.') || NON_FIELD_ERRORS_KEY;
    fields[key] = [...(fields[key] ?? []), issue.message];
  }
  return fieldErrorResponse(fields, status);
};
