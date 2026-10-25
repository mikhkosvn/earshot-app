'use client';

import { RunsView } from '../runs-view/runs-view';
import { RunsToolbar } from './toolbar/runs-toolbar';

export function RunsMode() {
  return (
    <div className="flex flex-col gap-2">
      <RunsToolbar />
      <RunsView />
    </div>
  );
}
