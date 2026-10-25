import type { z } from 'zod';

import {
  updateLabExpectedSchema,
  updateLabFeedbackSchema,
} from '@/server/labs/schemas';

export const expectedValueFormSchema = updateLabExpectedSchema.omit({
  reviewId: true,
});

export const notesFormSchema = updateLabFeedbackSchema.omit({
  reviewId: true,
});

export type ExpectedValueFormInput = z.input<typeof expectedValueFormSchema>;
export type ExpectedValueFormValues = z.output<typeof expectedValueFormSchema>;
export type NotesFormInput = z.input<typeof notesFormSchema>;
export type NotesFormValues = z.output<typeof notesFormSchema>;
