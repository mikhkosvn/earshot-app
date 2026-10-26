'use server';

import { listTags } from '@/server/tags/list-tags';
import type { ListTagsInput } from '@/server/tags/types';
import { TagsActionOperation } from '@/server/tags/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listTagsAction(args: ListTagsInput): Promise<string[]> {
  return withActionEvent(TagsActionOperation.listTags, () => listTags(args));
}
