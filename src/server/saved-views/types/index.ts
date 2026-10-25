import type { z } from 'zod';

import type {
  createSavedViewSchema,
  listSavedViewsSchema,
} from '@/server/saved-views/schemas';

export type ListSavedViewsInput = z.input<typeof listSavedViewsSchema>;
export type CreateSavedViewInput = z.input<typeof createSavedViewSchema>;

export interface SavedViewItem {
  id: number;
  name: string;
  agentIds: number[];
}
