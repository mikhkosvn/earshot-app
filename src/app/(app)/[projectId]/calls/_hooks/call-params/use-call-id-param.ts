'use client';

import { useQueryStates } from 'nuqs';

import { callsParser } from '@/lib/url-generator/parsers';

const callIdParsers = { callId: callsParser.callId };

export const useCallIdParam = () => {
  const [{ callId }, setValues] = useQueryStates(callIdParsers);

  const openCall = (id: number) => setValues({ callId: id });
  const closeCall = () => setValues({ callId: null });

  return { callId, openCall, closeCall };
};
