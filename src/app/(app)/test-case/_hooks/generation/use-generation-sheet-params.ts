'use client';

import { useQueryStates } from 'nuqs';

import { evaluatorsParser } from '@/lib/url-generator/parsers';

const sheetParsers = {
  reopenSheet: evaluatorsParser.reopenSheet,
  progressId: evaluatorsParser.progressId,
  sessionId: evaluatorsParser.sessionId,
};

export const useGenerationSheetParams = () => useQueryStates(sheetParsers);
