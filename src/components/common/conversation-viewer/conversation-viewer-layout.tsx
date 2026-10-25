'use client';

import { type ReactNode, Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';

import { ConversationViewerColumns } from './conversation-viewer-columns';
import { ConversationViewerSkeleton } from './conversation-viewer-skeleton';

type ConversationViewerLayoutProps = {
  conversationId: number;
  header?: ReactNode;
  actions?: ReactNode;
  shareToken?: string | null;
};

export function ConversationViewerLayout(props: ConversationViewerLayoutProps) {
  return (
    <QueryErrorBoundary>
      <Suspense fallback={<ConversationViewerSkeleton />}>
        <ConversationViewerColumns {...props} />
      </Suspense>
    </QueryErrorBoundary>
  );
}
