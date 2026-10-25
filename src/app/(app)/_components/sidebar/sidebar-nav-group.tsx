'use client';

import type { NavGroup } from '@/app/(app)/_constants/nav-types';

import { SidebarGroupLabel } from './sidebar-group-label';
import { SidebarNavLink } from './sidebar-nav-link';

type SidebarNavGroupProps = {
  group: NavGroup;
};

export function SidebarNavGroup({ group }: SidebarNavGroupProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <SidebarGroupLabel label={group.label} />
      {group.items.map((item) => (
        <SidebarNavLink key={item.label} item={item} />
      ))}
    </div>
  );
}
