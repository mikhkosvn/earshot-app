'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type NoConfigurationsItemProps = {
  count: number;
};

export function NoConfigurationsItem({ count }: NoConfigurationsItemProps) {
  if (count > 0) return null;
  return (
    <DropdownMenuItem disabled className="text-xs">
      No saved dashboards
    </DropdownMenuItem>
  );
}
