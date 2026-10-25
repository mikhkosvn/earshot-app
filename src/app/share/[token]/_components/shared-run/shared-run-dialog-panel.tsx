'use client';

import dynamic from 'next/dynamic';

const SharedRunDialog = dynamic(
  () =>
    import('./shared-run-dialog').then((module) => module.SharedRunDialog),
  { ssr: false },
);

export function SharedRunDialogPanel() {
  return <SharedRunDialog />;
}
