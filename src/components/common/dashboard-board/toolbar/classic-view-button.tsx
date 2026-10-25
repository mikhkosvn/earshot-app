'use client';

import { ListIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { Button } from '@/components/ui/button';
import { DashboardSource } from '@/generated/prisma/enums';
import { runsOverviewParser } from '@/lib/url-generator/parsers';

interface ClassicViewButtonProps {
  source: DashboardSource;
}

const viewParsers = {
  view: runsOverviewParser.view,
  dashboard: runsOverviewParser.dashboard,
};

export function ClassicViewButton({ source }: ClassicViewButtonProps) {
  const [, setView] = useQueryStates(viewParsers);

  if (source !== DashboardSource.runs) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        void setView({ view: null, dashboard: null });
      }}
    >
      <ListIcon />
      Classic view
    </Button>
  );
}
