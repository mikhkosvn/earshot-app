'use client';

import { useAgentOptions } from '../use-agent-options';

export const useDefaultAgentId = () => useAgentOptions()[0]?.id ?? null;
