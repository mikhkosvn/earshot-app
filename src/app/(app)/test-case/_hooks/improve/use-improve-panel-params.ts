'use client';

import { useQueryStates } from 'nuqs';

import { evaluatorsParser } from '@/lib/url-generator/parsers';

const improvePanelParsers = {
  improve: evaluatorsParser.improve,
};

export const useImprovePanelParams = () => useQueryStates(improvePanelParsers);
