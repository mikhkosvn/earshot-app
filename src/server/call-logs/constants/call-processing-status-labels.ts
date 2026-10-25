import { CallProcessingStatus } from '@/generated/prisma/enums';

export const CallProcessingStatusLabel: Record<CallProcessingStatus, string> = {
  [CallProcessingStatus.pending]: 'Pending',
  [CallProcessingStatus.transcribing]: 'Transcribing',
  [CallProcessingStatus.evaluating]: 'Evaluating',
  [CallProcessingStatus.completed]: 'Completed',
  [CallProcessingStatus.failed]: 'Failed',
};
