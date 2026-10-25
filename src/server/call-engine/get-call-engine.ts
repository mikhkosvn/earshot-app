import 'server-only';

import { CallEngineKind } from '@/server/call-engine/constants';
import { mockCallEngine } from '@/server/call-engine/mock/mock-call-engine';
import type { CallEngine } from '@/server/call-engine/types';

export const getCallEngine = (): CallEngine => {
  const kind = process.env.CALL_ENGINE || CallEngineKind.mock;
  if (kind === CallEngineKind.mock) return mockCallEngine;
  throw new Error(`The call engine "${kind}" is not available.`);
};
