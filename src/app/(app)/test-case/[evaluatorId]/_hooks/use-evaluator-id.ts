'use client';

import { useParams } from 'next/navigation';

import { parseEvaluatorId } from '../_utils/parse-evaluator-id';

export const useEvaluatorId = () => {
  const { evaluatorId } = useParams<{ evaluatorId: string }>();
  const id = parseEvaluatorId(evaluatorId);
  if (id === null) throw new Error('The evaluator ID in the URL is not valid.');
  return id;
};
