import 'server-only';

import { ExternalService } from '@/server/common/logging/constants';
import {
  recordExternalCall,
  recordExternalError,
} from '@/server/common/logging/event-fields';
import type { KmsOperation } from '@/server/crypto/constants';

export const callKms = async <T>(
  operation: KmsOperation,
  request: () => Promise<T>,
) => {
  const startedMs = performance.now();
  try {
    const response = await request();
    recordExternalCall({
      service: ExternalService.kms,
      operation,
      attempt: 1,
      duration_ms: Math.round(performance.now() - startedMs),
    });
    return response;
  } catch (error) {
    recordExternalCall({
      service: ExternalService.kms,
      operation,
      attempt: 1,
      duration_ms: Math.round(performance.now() - startedMs),
    });
    recordExternalError(error);
    throw error;
  }
};
