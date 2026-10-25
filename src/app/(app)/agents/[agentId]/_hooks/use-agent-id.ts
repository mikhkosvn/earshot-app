'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export const useAgentId = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [stableId] = useState(() => Number(agentId));
  return stableId;
};
