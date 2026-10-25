'use client';

import { ShareLinkTarget } from '@/generated/prisma/enums';

import { useSharedView } from '../_hooks/use-shared-view';
import { InvalidShareLink } from './invalid-share-link';
import { SharedCallView } from './shared-call-view';
import { SharedResultView } from './shared-result/shared-result-view';
import { SharedRunView } from './shared-run/shared-run-view';

export function ShareContent() {
  const view = useSharedView();

  if (!view) return <InvalidShareLink />;
  if (view.target === ShareLinkTarget.result) return <SharedResultView />;
  if (view.target === ShareLinkTarget.run) return <SharedRunView />;
  return <SharedCallView />;
}
