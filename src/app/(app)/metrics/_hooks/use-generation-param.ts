'use client';

import { useQueryStates } from 'nuqs';

import { metricsParser } from '@/lib/url-generator/parsers';

const generationParsers = { generation: metricsParser.generation };

export const useGenerationParam = () => {
  const [{ generation }, setValues] = useQueryStates(generationParsers);

  const clearGeneration = () => setValues({ generation: null });

  return { jobId: generation, clearGeneration };
};
