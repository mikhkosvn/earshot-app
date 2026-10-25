import { ListIcon, ListTreeIcon } from 'lucide-react';

import { ResultsView } from '@/lib/url-generator/constants';

import { ResultsViewToggleButton } from './results-view-toggle-button';

export function ResultsViewToggle() {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border bg-background p-0.5">
      <ResultsViewToggleButton
        target={ResultsView.results}
        icon={ListTreeIcon}
        label="Results"
      />
      <ResultsViewToggleButton
        target={ResultsView.runs}
        icon={ListIcon}
        label="Runs"
      />
    </div>
  );
}
