import { z } from 'zod';

import { folderNameSchema } from '@/server/folders/schemas';

const REQUIRED_FIELD_MESSAGE = 'This field is required.';

export const createPublicFolderSchema = z.object({
  name: z.string({ error: REQUIRED_FIELD_MESSAGE }).pipe(folderNameSchema),
  project_id: z.number().int().positive().nullish(),
});
