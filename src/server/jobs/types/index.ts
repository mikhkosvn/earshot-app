import type { z } from 'zod';

import type { Prisma } from '@/generated/prisma/client';
import type { JobKind, JobStatus } from '@/generated/prisma/enums';
import type {
  dismissAllJobsSchema,
  dismissJobSchema,
  getJobSchema,
  listRecentJobsSchema,
} from '@/server/jobs/schemas';

export type GetJobInput = z.infer<typeof getJobSchema>;
export type ListRecentJobsInput = z.infer<typeof listRecentJobsSchema>;
export type DismissJobInput = z.infer<typeof dismissJobSchema>;
export type DismissAllJobsInput = z.infer<typeof dismissAllJobsSchema>;

export interface JobResultPayload extends Prisma.InputJsonObject {
  summary?: string;
  deepLink?: string;
}

export interface JobResult extends Prisma.JsonObject {
  summary?: string;
  deepLink?: string;
}

export interface JobView {
  id: string;
  projectId: number;
  kind: JobKind;
  status: JobStatus;
  currentStep: string | null;
  input: Prisma.JsonValue;
  result: JobResult | null;
  error: string | null;
  createdAt: Date;
  startedAt: Date | null;
  finishedAt: Date | null;
}

export interface JobContext<TInput> {
  jobId: string;
  projectId: number;
  userId: number | null;
  input: TInput;
  setStep: (text: string) => Promise<void>;
  setResult: (result: JobResultPayload) => Promise<void>;
}

export interface StartJobArgs<TInput extends Prisma.InputJsonValue> {
  projectId: number;
  userId?: number | null;
  kind: JobKind;
  input: TInput;
  initialStep?: string;
  run: (context: JobContext<TInput>) => Promise<void>;
}

export interface StartedJob {
  jobId: string;
}
