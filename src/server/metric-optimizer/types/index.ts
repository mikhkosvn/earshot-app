import type { z } from 'zod';

import type { OptimizationStatus, Timezone } from '@/generated/prisma/enums';
import type { LabScore } from '@/server/labs/types';
import type { ProposalField } from '@/server/metric-optimizer/constants/proposal-field';
import type {
  createOptimizerScheduleSchema,
  listOptimizerSchedulesSchema,
  optimizationSessionSchema,
  optimizerScheduleFieldsSchema,
  optimizerScheduleIdSchema,
  startMetricOptimizationSchema,
  updateOptimizerScheduleSchema,
} from '@/server/metric-optimizer/schemas';

export type StartMetricOptimizationInput = z.input<
  typeof startMetricOptimizationSchema
>;
export type OptimizationSessionInput = z.input<
  typeof optimizationSessionSchema
>;
export type OptimizerScheduleFields = z.input<
  typeof optimizerScheduleFieldsSchema
>;
export type CreateOptimizerScheduleInput = z.input<
  typeof createOptimizerScheduleSchema
>;
export type UpdateOptimizerScheduleInput = z.input<
  typeof updateOptimizerScheduleSchema
>;
export type OptimizerScheduleIdInput = z.input<
  typeof optimizerScheduleIdSchema
>;
export type ListOptimizerSchedulesInput = z.input<
  typeof listOptimizerSchedulesSchema
>;

export interface ProposalChange {
  field: ProposalField;
  label: string;
  before: string;
  after: string;
}

export interface OptimizationProposalView {
  id: number;
  version: number;
  changes: ProposalChange[];
}

export interface OptimizationView {
  sessionId: number;
  status: OptimizationStatus;
  jobId: string | null;
  summary: string | null;
  oldScore: LabScore | null;
  newScore: LabScore | null;
  scheduleName: string | null;
  createdAt: Date;
  proposal: OptimizationProposalView | null;
}

export interface OptimizerScheduleView {
  id: number;
  name: string;
  cronExpression: string;
  timezone: Timezone;
  isActive: boolean;
  nextRunAt: Date | null;
  lastRunAt: Date | null;
  createdAt: Date;
}

export interface QueuedOptimization {
  sessionId: number;
  jobId: string;
}

export interface ProposalSummary {
  whatChanged: string[];
  whatItChecks: string;
  returnsFalseWhen: string;
  returnsTrueWhen: string;
  notApplicableWhen: string;
}
