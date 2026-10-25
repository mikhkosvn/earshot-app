'use client';

import { PageHeader } from '@/components/common/page-header/page-header';
import { ROLE_SUBTITLE } from '@/components/common/metric-form/_constants/metric-form-text';

import type { CreateMode } from '../_constants/create-mode';
import { ModeSwitch } from './mode-switch';

interface CreateMetricHeaderProps {
  mode: CreateMode;
  onModeChange: (mode: CreateMode) => void;
}

export function CreateMetricHeader({
  mode,
  onModeChange,
}: CreateMetricHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2.5">
      <PageHeader
        title="Create Metrics"
        description={ROLE_SUBTITLE}
        className="[&_h1]:text-base"
      />
      <ModeSwitch mode={mode} onModeChange={onModeChange} />
    </div>
  );
}
