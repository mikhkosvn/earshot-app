'use server';

import { listTags } from '@/server/tags/list-tags';
import type { ListTagsInput } from '@/server/tags/types';

export async function listTagsAction(args: ListTagsInput): Promise<string[]> {
  return listTags(args);
}
