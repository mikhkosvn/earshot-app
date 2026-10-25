'use client';

import { useState } from 'react';

import {
  MAIN_NAV_FOOTER_ITEMS,
  MAIN_NAV_GROUPS,
} from '@/app/(app)/_constants/main-nav';

import { SidebarCollapseButton } from './sidebar-collapse-button';
import { SidebarNavGroup } from './sidebar-nav-group';
import { SidebarNavLink } from './sidebar-nav-link';

export function MainSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="Main navigation"
      data-collapsed={isCollapsed}
      className="group/sidebar relative flex w-52 shrink-0 flex-col justify-between gap-4 overflow-x-hidden overflow-y-auto border-r bg-background px-3 py-3.5 transition-[width] duration-300 data-[collapsed=true]:w-14 data-[collapsed=true]:px-2"
    >
      <SidebarCollapseButton
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((value) => !value)}
      />
      <nav className="flex flex-col gap-3">
        {MAIN_NAV_GROUPS.map((group) => (
          <SidebarNavGroup key={group.label} group={group} />
        ))}
      </nav>
      <div className="flex flex-col gap-0.5">
        {MAIN_NAV_FOOTER_ITEMS.map((item) => (
          <SidebarNavLink key={item.label} item={item} />
        ))}
      </div>
    </aside>
  );
}
