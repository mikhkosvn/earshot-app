'use client';

import { Suspense } from 'react';

import { BackgroundTaskPanelStack } from './background-task-panel-stack';

export function BackgroundTaskPanels() {
  return (
    <Suspense fallback={null}>
      <BackgroundTaskPanelStack />
    </Suspense>
  );
}
