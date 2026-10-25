'use client';

import dynamic from 'next/dynamic';

const BackgroundTaskPanelStack = dynamic(
  () =>
    import('./background-task-panel-stack').then(
      (module) => module.BackgroundTaskPanelStack,
    ),
  { ssr: false },
);

export function BackgroundTaskPanels() {
  return <BackgroundTaskPanelStack />;
}
