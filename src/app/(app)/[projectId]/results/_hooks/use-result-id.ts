'use client';

import { useParams } from 'next/navigation';

export const useResultId = () => {
  const { resultId } = useParams<{ resultId: string }>();
  return Number(resultId);
};
