'use client';

import { useCurrentSavedView } from '../../../_hooks/results-list/use-current-saved-view';

export function SelectViewLabel() {
  const view = useCurrentSavedView();

  if (!view) return <span>Select View</span>;
  return <span className="truncate">{view.name}</span>;
}
