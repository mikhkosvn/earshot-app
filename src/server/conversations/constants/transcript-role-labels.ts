import { TranscriptRole } from '@/generated/prisma/enums';

export const TranscriptRoleLabel: Record<TranscriptRole, string> = {
  [TranscriptRole.main_agent]: 'Main Agent',
  [TranscriptRole.testing_agent]: 'Testing Agent',
};
