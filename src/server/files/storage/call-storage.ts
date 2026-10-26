import 'server-only';

import { ExternalService } from '@/server/common/logging/constants';
import { ExternalCallError } from '@/server/common/logging/errors/external-call-error';
import { recordExternalCall } from '@/server/common/logging/event-fields';
import type { StorageOperation } from '@/server/files/storage/storage-operation';

const readCode = (error: unknown) => {
  if (typeof error !== 'object' || error === null) return undefined;
  const code: unknown = Reflect.get(error, 'code');
  if (typeof code === 'string') return code;
  return undefined;
};

const messageOf = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const storageCall = (operation: StorageOperation) => ({
  service: ExternalService.file_storage,
  operation,
  attempt: 1,
});

export const storageError = (operation: StorageOperation, error: unknown) =>
  new ExternalCallError(
    {
      ...storageCall(operation),
      message: messageOf(error),
      code: readCode(error),
    },
    { cause: error },
  );

export const callStorage = async <T>(
  operation: StorageOperation,
  run: () => Promise<T>,
): Promise<T> => {
  const startedMs = performance.now();
  try {
    const result = await run();
    recordExternalCall({
      ...storageCall(operation),
      duration_ms: Math.round(performance.now() - startedMs),
    });
    return result;
  } catch (error) {
    recordExternalCall({
      ...storageCall(operation),
      duration_ms: Math.round(performance.now() - startedMs),
    });
    throw storageError(operation, error);
  }
};
