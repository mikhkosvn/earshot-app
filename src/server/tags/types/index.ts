import type { z } from 'zod';

import type { listTagsSchema } from '@/server/tags/schemas';

export type ListTagsInput = z.infer<typeof listTagsSchema>;
