'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import type { ConversationDetail } from '@/server/conversations/types';
import type {
  ResultDetail,
  RunDetail,
  RunListPage,
} from '@/server/results/types';
import { createShareLink } from '@/server/share-links/create-share-link';
import { getSharedConversation } from '@/server/share-links/shared/get-shared-conversation';
import { getSharedResult } from '@/server/share-links/shared/get-shared-result';
import { getSharedRun } from '@/server/share-links/shared/get-shared-run';
import { getSharedView } from '@/server/share-links/shared/get-shared-view';
import { listSharedRuns } from '@/server/share-links/shared/list-shared-runs';
import type {
  CreatedShareLink,
  CreateShareLinkInput,
  SharedConversationInput,
  SharedRunInput,
  SharedRunsInput,
  SharedView,
  ShareLinkTokenInput,
} from '@/server/share-links/types';

export async function createShareLinkAction(
  args: CreateShareLinkInput,
): Promise<ActionResult<CreatedShareLink>> {
  return runAction(() => createShareLink(args));
}

export async function getSharedViewAction(
  args: ShareLinkTokenInput,
): Promise<SharedView | null> {
  return getSharedView(args);
}

export async function getSharedResultAction(
  args: ShareLinkTokenInput,
): Promise<ResultDetail> {
  return getSharedResult(args);
}

export async function listSharedRunsAction(
  args: SharedRunsInput,
): Promise<RunListPage> {
  return listSharedRuns(args);
}

export async function getSharedRunAction(
  args: SharedRunInput,
): Promise<RunDetail> {
  return getSharedRun(args);
}

export async function getSharedConversationAction(
  args: SharedConversationInput,
): Promise<ConversationDetail> {
  return getSharedConversation(args);
}
