import { noop } from '@tanstack/react-query';

import { ConversationService } from '@/components/common/conversation-viewer/_service';
import { ShareLinkTarget } from '@/generated/prisma/enums';
import type getQueryClient from '@/lib/query-client/get-query-client';
import type { SharedView } from '@/server/share-links/types';

import {
  type loadShareParams,
  RUN_DETAIL_PARAM,
  RUN_PAGE_PARAM,
} from '../_constants/share-params';
import { ShareService } from '../_service';

type ShareQueryClient = ReturnType<typeof getQueryClient>;

type ShareParams = Awaited<ReturnType<typeof loadShareParams>>;

const prefetchConversation = (
  queryClient: ShareQueryClient,
  token: string,
  conversationId: number,
) =>
  queryClient.query({
    ...ConversationService.getConversationQuery({
      conversationId,
      shareToken: token,
    }),
    retry: false,
  });

const prefetchRunWithConversation = async (
  queryClient: ShareQueryClient,
  token: string,
  runId: number,
) => {
  const run = await queryClient
    .query({ ...ShareService.getRunQuery({ token, runId }), retry: false })
    .catch(() => null);
  if (!run) return;
  void prefetchConversation(queryClient, token, run.conversationId).catch(
    noop,
  );
};

const prefetchResult = async (
  queryClient: ShareQueryClient,
  token: string,
  params: ShareParams,
) => {
  void queryClient
    .query({ ...ShareService.getResultQuery({ token }), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...ShareService.getRunsQuery({
        token,
        page: params[RUN_PAGE_PARAM],
        pageSize: params.pageSize,
      }),
      retry: false,
    })
    .catch(noop);
  const runId = params[RUN_DETAIL_PARAM];
  if (runId === null) return;
  await prefetchRunWithConversation(queryClient, token, runId);
};

export const prefetchSharedTarget = async (
  queryClient: ShareQueryClient,
  token: string,
  view: SharedView,
  params: ShareParams,
) => {
  if (view.target === ShareLinkTarget.result) {
    await prefetchResult(queryClient, token, params);
    return;
  }
  if (view.target === ShareLinkTarget.run && view.runId !== null) {
    void queryClient
      .query({
        ...ShareService.getRunQuery({ token, runId: view.runId }),
        retry: false,
      })
      .catch(noop);
  }
  if (view.conversationId === null) return;
  void prefetchConversation(queryClient, token, view.conversationId).catch(
    noop,
  );
};
