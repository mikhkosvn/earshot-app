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
import { ShareLinksActionOperation } from '@/server/share-links/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function createShareLinkAction(
  args: CreateShareLinkInput,
): Promise<ActionResult<CreatedShareLink>> {
  return withActionEvent(ShareLinksActionOperation.createShareLink, () =>
    runAction(() => createShareLink(args)),
  );
}

export async function getSharedViewAction(
  args: ShareLinkTokenInput,
): Promise<SharedView | null> {
  return withActionEvent(ShareLinksActionOperation.getSharedView, () =>
    getSharedView(args),
  );
}

export async function getSharedResultAction(
  args: ShareLinkTokenInput,
): Promise<ResultDetail> {
  return withActionEvent(ShareLinksActionOperation.getSharedResult, () =>
    getSharedResult(args),
  );
}

export async function listSharedRunsAction(
  args: SharedRunsInput,
): Promise<RunListPage> {
  return withActionEvent(ShareLinksActionOperation.listSharedRuns, () =>
    listSharedRuns(args),
  );
}

export async function getSharedRunAction(
  args: SharedRunInput,
): Promise<RunDetail> {
  return withActionEvent(ShareLinksActionOperation.getSharedRun, () =>
    getSharedRun(args),
  );
}

export async function getSharedConversationAction(
  args: SharedConversationInput,
): Promise<ConversationDetail> {
  return withActionEvent(ShareLinksActionOperation.getSharedConversation, () =>
    getSharedConversation(args),
  );
}
