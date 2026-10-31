import { MetricEvaluationStatus } from '@/generated/prisma/enums';

export const PublicRunType = {
  voice: 'Voice',
} as const;

export type PublicRunType = (typeof PublicRunType)[keyof typeof PublicRunType];

export const MAX_BULK_RUN_IDS = 200;
export const MAX_RECORD_ID = 2_147_483_647;

export const RUN_IDS_FORMAT_MESSAGE =
  'Send run_ids as comma-separated integers.';
export const RUN_IDS_LIMIT_MESSAGE = `Send ${MAX_BULK_RUN_IDS} or fewer run ids.`;
export const REQUIRED_FIELD_MESSAGE = 'This field is required.';

export const PUBLIC_EVALUATION_STATUSES: MetricEvaluationStatus[] = [
  MetricEvaluationStatus.completed,
  MetricEvaluationStatus.failed,
];
