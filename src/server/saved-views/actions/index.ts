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
import { SavedViewsActionOperation } from '@/server/saved-views/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listSavedViewsAction(
  args: ListSavedViewsInput,
): Promise<SavedViewItem[]> {
  return withActionEvent(SavedViewsActionOperation.listSavedViews, () =>
    listSavedViews(args),
  );
}

export async function createSavedViewAction(
  args: CreateSavedViewInput,
): Promise<ActionResult<SavedViewItem>> {
  return withActionEvent(SavedViewsActionOperation.createSavedView, () =>
    runAction(() => createSavedView(args)),
  );
}
