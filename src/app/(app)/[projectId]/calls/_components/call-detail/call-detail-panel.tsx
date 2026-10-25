'use client';

import dynamic from 'next/dynamic';

const CallDetailDialog = dynamic(
  () =>
    import('./call-detail-dialog').then((module) => module.CallDetailDialog),
  { ssr: false },
);

export function CallDetailPanel() {
  return <CallDetailDialog />;
}
