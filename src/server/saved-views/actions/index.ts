'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createSavedView } from '@/server/saved-views/create-saved-view';
import { listSavedViews } from '@/server/saved-views/list-saved-views';
import type {
  CreateSavedViewInput,
  ListSavedViewsInput,
  SavedViewItem,
} from '@/server/saved-views/types';

export async function listSavedViewsAction(
  args: ListSavedViewsInput,
): Promise<SavedViewItem[]> {
  return listSavedViews(args);
}

export async function createSavedViewAction(
  args: CreateSavedViewInput,
): Promise<ActionResult<SavedViewItem>> {
  return runAction(() => createSavedView(args));
}
