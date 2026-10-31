import 'server-only';

import { setTimeout as wait } from 'node:timers/promises';

import {
  VAPI_INCOMPLETE_RETRY_COUNT,
  VAPI_INCOMPLETE_RETRY_DELAY_MS,
  VAPI_WINDOW_AFTER_END_MS,
  VAPI_WINDOW_BEFORE_START_MS,
} from '@/server/runs/constants/provider-call-data';
import { fetchVapiCalls } from '@/server/runs/execution/provider-call-data/fetch-vapi-calls';
import {
  isCompleteVapiCall,
  matchVapiCall,
  type VapiCallTarget,
} from '@/server/runs/execution/provider-call-data/match-vapi-call';
import type { VapiCall } from '@/server/runs/schemas/vapi-call';

interface FoundVapiCall {
  call: VapiCall;
  complete: boolean;
  attempts: number;
}

const MAX_ATTEMPTS = VAPI_INCOMPLETE_RETRY_COUNT + 1;

export const findVapiCall = async (
  apiKey: string,
  target: VapiCallTarget,
): Promise<FoundVapiCall | null> => {
  const createdAtGe = new Date(
    target.startedAt.getTime() - VAPI_WINDOW_BEFORE_START_MS,
  );
  const createdAtLe = new Date(
    target.endedAt.getTime() + VAPI_WINDOW_AFTER_END_MS,
  );
  let latest: FoundVapiCall | null = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const calls = await fetchVapiCalls({
      apiKey,
      createdAtGe,
      createdAtLe,
      attempt,
    });
    const call = matchVapiCall(calls, target);
    if (!call) return latest;
    latest = { call, complete: isCompleteVapiCall(call), attempts: attempt };
    if (latest.complete) return latest;
    if (attempt < MAX_ATTEMPTS) await wait(VAPI_INCOMPLETE_RETRY_DELAY_MS);
  }
  return latest;
};
