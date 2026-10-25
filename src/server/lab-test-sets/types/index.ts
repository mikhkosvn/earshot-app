import type { z } from 'zod';

import type {
  addRunsToLabSchema,
  createLabTestSetSchema,
  labCorrectionSchema,
} from '@/server/lab-test-sets/schemas';

export type LabCorrection = z.output<typeof labCorrectionSchema>;
export type CreateLabTestSetInput = z.input<typeof createLabTestSetSchema>;
export type AddRunsToLabInput = z.input<typeof addRunsToLabSchema>;

export type LabTestSetSummary = {
  id: number;
  conversationId: number;
  reviewCount: number;
};
