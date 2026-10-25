import { agentConnectionSchema } from '@/server/agents/schemas';

export const WizardStep = {
  connection: 'connection',
  basicInfo: 'basicInfo',
} as const;

export type WizardStep = (typeof WizardStep)[keyof typeof WizardStep];

export const CONNECTION_STEP_FIELDS = agentConnectionSchema.keyof().options;
