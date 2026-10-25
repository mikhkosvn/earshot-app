'use client';

import { ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { RunsOverviewView } from '@/lib/url-generator/constants';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';

export function TryDashboardsButton() {
  const [, setParams] = useRunsOverviewParams();

  return (
    <Button
      size="sm"
      onClick={() => {
        void setParams({ view: RunsOverviewView.new });
      }}
    >
      Try Dashboards
      <ArrowRightIcon />
    </Button>
  );
}
