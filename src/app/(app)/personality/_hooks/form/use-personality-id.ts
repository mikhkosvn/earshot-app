'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export const usePersonalityId = () => {
  const { personalityId } = useParams<{ personalityId: string }>();
  const [stableId] = useState(() => Number(personalityId));
  return stableId;
};
