import { TranscriptRole } from '@/generated/prisma/enums';

export const OBSERVE_ROLE_MAP: Record<string, TranscriptRole> = {
  user: TranscriptRole.testing_agent,
  customer: TranscriptRole.testing_agent,
  testing_agent: TranscriptRole.testing_agent,
  'testing agent': TranscriptRole.testing_agent,
  assistant: TranscriptRole.main_agent,
  agent: TranscriptRole.main_agent,
  bot: TranscriptRole.main_agent,
  main_agent: TranscriptRole.main_agent,
  'main agent': TranscriptRole.main_agent,
};

export const ObserveTranscriptType = {
  custom: 'custom',
} as const;

export type ObserveTranscriptType =
  (typeof ObserveTranscriptType)[keyof typeof ObserveTranscriptType];
