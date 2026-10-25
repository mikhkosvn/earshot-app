'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { agentConfigSchema } from '@/server/agents/schemas';
import type { AgentConfigValues } from '@/server/agents/types';

import { DEFAULT_AGENT_CONFIG_VALUES } from '../../_constants/agent-form-defaults';

export const useCreateAgentForm = () =>
  useForm<AgentConfigValues>({
    resolver: zodResolver(agentConfigSchema),
    defaultValues: DEFAULT_AGENT_CONFIG_VALUES,
  });
