import 'server-only';

import { APIError } from '@anthropic-ai/sdk';
import { ZodError } from 'zod';

import { Prisma } from '@/generated/prisma/client';

import {
  ExternalService,
  STATUS_CODE_SERVER_ERROR,
  STATUS_CODE_TOO_MANY_REQUESTS,
} from '../constants';
import type { ErrorFields } from '../types';
import { ExternalCallError } from './external-call-error';

const VALIDATION_ERROR_CODE = 'validation';

const isRetriableStatus = (status: number | undefined) => {
  if (status === undefined) return undefined;
  return (
    status === STATUS_CODE_TOO_MANY_REQUESTS ||
    status >= STATUS_CODE_SERVER_ERROR
  );
};

const readStringProperty = (value: object, key: string) => {
  const property: unknown = Reflect.get(value, key);
  if (typeof property === 'string') return property;
  return undefined;
};

const readNumberProperty = (value: object, key: string) => {
  const property: unknown = Reflect.get(value, key);
  if (typeof property === 'number') return property;
  return undefined;
};

const describePrismaError = (error: Error): ErrorFields | null => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      type: error.name,
      service: ExternalService.postgres,
      code: error.code,
      message: error.message,
      response: JSON.stringify(error.meta ?? {}),
      retriable: false,
    };
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      type: error.name,
      service: ExternalService.postgres,
      code: error.errorCode,
      message: error.message,
      retriable: true,
    };
  }
  if (
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return {
      type: error.name,
      service: ExternalService.postgres,
      message: error.message,
      retriable: false,
    };
  }
  return null;
};

const describeAnthropicError = (error: APIError): ErrorFields => ({
  type: error.name,
  service: ExternalService.anthropic,
  code: error.type ?? undefined,
  message: error.message,
  status_code: error.status,
  service_request_id: error.requestID ?? undefined,
  response: JSON.stringify(error.error ?? null),
  retriable: isRetriableStatus(error.status),
});

const describeZodError = (error: ZodError): ErrorFields => ({
  type: error.name,
  code: VALIDATION_ERROR_CODE,
  message: error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; '),
  retriable: false,
});

const describeCause = (error: Error, depth: number) => {
  if (error.cause === undefined || depth > 0) return undefined;
  return describeErrorAtDepth(error.cause, depth + 1);
};

const describeErrorAtDepth = (error: unknown, depth: number): ErrorFields => {
  if (error instanceof ExternalCallError) {
    return {
      type: error.name,
      ...error.fields,
      retriable:
        error.fields.retriable ?? isRetriableStatus(error.fields.status_code),
      cause: describeCause(error, depth),
    };
  }
  if (error instanceof ZodError) return describeZodError(error);
  if (error instanceof APIError) return describeAnthropicError(error);
  if (!(error instanceof Error)) {
    return { type: typeof error, message: String(error) };
  }
  const prismaError = describePrismaError(error);
  if (prismaError) return prismaError;
  const status = readNumberProperty(error, 'status');
  return {
    type: error.name,
    message: error.message,
    code: readStringProperty(error, 'code'),
    status_code: status,
    retriable: isRetriableStatus(status),
    cause: describeCause(error, depth),
  };
};

export const describeError = (error: unknown): ErrorFields =>
  describeErrorAtDepth(error, 0);
