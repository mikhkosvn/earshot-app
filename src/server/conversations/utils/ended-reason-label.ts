import {
  CALL_ENDED_REASON_LABEL,
  CallEndedReason,
} from '@/server/call-engine/constants';

const isCallEndedReason = (value: string): value is CallEndedReason =>
  Object.values<string>(CallEndedReason).includes(value);

export const endedReasonLabel = (value: string | null) => {
  if (!value) return null;
  if (isCallEndedReason(value)) return CALL_ENDED_REASON_LABEL[value];
  return value;
};
