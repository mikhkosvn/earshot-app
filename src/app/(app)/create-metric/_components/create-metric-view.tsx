'use client';

import { useState } from 'react';

import { CreateMode } from '../_constants/create-mode';
import { guideGridClass } from '../_utils/guide-grid-class';
import { CreateMetricBreadcrumb } from './create-metric-breadcrumb';
import { CreateMetricHeader } from './create-metric-header';
import { GuidePanel } from './guide/guide-panel';
import { ModeContent } from './mode-content';

export function CreateMetricView() {
  const [mode, setMode] = useState<CreateMode>(CreateMode.quick);
  const [isGuideOpen, setIsGuideOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <CreateMetricBreadcrumb />
      <div className={guideGridClass(isGuideOpen)}>
        <div className="flex min-w-0 flex-col gap-3">
          <CreateMetricHeader mode={mode} onModeChange={setMode} />
          <ModeContent mode={mode} onModeChange={setMode} />
        </div>
        <GuidePanel
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />
      </div>
    </div>
  );
}
