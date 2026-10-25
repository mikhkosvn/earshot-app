import { TranscriptRole } from '@/generated/prisma/enums';

export const SpeakerLabel: Record<TranscriptRole, string> = {
  [TranscriptRole.testing_agent]: 'Caller',
  [TranscriptRole.main_agent]: 'Agent',
};
