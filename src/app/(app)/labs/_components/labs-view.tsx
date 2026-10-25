'use client';

import { PageHeader } from '@/components/common/page-header/page-header';

import { LABS_DESCRIPTION } from '../_constants/labs-text';
import { LabMetricsTable } from './lab-metrics-table';

export function LabsView() {
  return (
    <div className="flex flex-col gap-3">
      <PageHeader title="Labs" description={LABS_DESCRIPTION} />
      <LabMetricsTable />
    </div>
  );
}
