'use client';

import dynamic from 'next/dynamic';

const RunDetailPanel = dynamic(
  () => import('./run-detail-panel').then((module) => module.RunDetailPanel),
  { ssr: false },
);

export function RunDetailDialog() {
  return <RunDetailPanel />;
}
