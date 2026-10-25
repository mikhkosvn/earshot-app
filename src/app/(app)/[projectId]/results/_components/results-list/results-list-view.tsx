'use client';

import { ResultsView } from '@/lib/url-generator/constants';

import { useResultsViewParam } from '../../_hooks/results-list/use-results-view-param';
import { ResultsMode } from './results-mode';
import { RunsMode } from './runs-mode';

export function ResultsListView() {
  const { view } = useResultsViewParam();

  if (view === ResultsView.runs) return <RunsMode />;
  return <ResultsMode />;
}
