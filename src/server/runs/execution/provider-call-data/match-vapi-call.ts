import 'server-only';

import { VAPI_MAX_MATCH_GAP_MS } from '@/server/runs/constants/provider-call-data';
import type { VapiCall } from '@/server/runs/schemas/vapi-call';

export interface VapiCallTarget {
  startedAt: Date;
  endedAt: Date;
  fromNumber: string | null;
}

interface ScoredVapiCall {
  call: VapiCall;
  gapMs: number;
}

const timeOf = (value: string | null | undefined) => {
  if (!value) return null;
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return null;
  return time;
};

const endGapOf = (call: VapiCall, target: VapiCallTarget) => {
  const endedAt = timeOf(call.endedAt);
  if (endedAt === null) return 0;
  return Math.abs(endedAt - target.endedAt.getTime());
};

const scoreOf = (
  call: VapiCall,
  target: VapiCallTarget,
): ScoredVapiCall | null => {
  const startedAt = timeOf(call.startedAt);
  if (startedAt === null) return null;
  const startGap = Math.abs(startedAt - target.startedAt.getTime());
  return { call, gapMs: startGap + endGapOf(call, target) };
};

const matchesNumber = (call: VapiCall, fromNumber: string | null) => {
  if (!fromNumber) return true;
  return call.customer?.number === fromNumber;
};

export const isCompleteVapiCall = (call: VapiCall) =>
  Boolean(call.endedAt) &&
  call.artifact !== undefined &&
  call.artifact !== null;

export const matchVapiCall = (calls: VapiCall[], target: VapiCallTarget) => {
  const best = calls
    .filter((call) => matchesNumber(call, target.fromNumber))
    .flatMap((call) => {
      const scored = scoreOf(call, target);
      if (!scored) return [];
      return [scored];
    })
    .toSorted((left, right) => left.gapMs - right.gapMs)
    .at(0);
  if (!best || best.gapMs > VAPI_MAX_MATCH_GAP_MS) return null;
  return best.call;
};
