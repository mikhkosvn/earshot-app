'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavItem } from '@/app/(app)/_constants/nav-types';
import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { isNavItemActive } from '@/app/(app)/_utils/nav-active';

interface SidebarNavLinkProps {
  item: NavItem;
}

export function SidebarNavLink({ item }: SidebarNavLinkProps) {
  const pathname = usePathname();
  const projectId = useCurrentProjectId();
  const isActive = isNavItemActive(item, pathname, projectId);
  const Icon = item.icon;

  return (
    <Link
      href={item.href(projectId)}
      aria-current={isActive && 'page'}
      data-active={isActive}
      className="flex items-center gap-2 rounded-md px-3 py-1.25 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:font-semibold data-[active=true]:text-foreground data-[active=true]:shadow-xs"
    >
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <span className="truncate group-data-[collapsed=true]/sidebar:sr-only">
        {item.label}
      </span>
    </Link>
  );
}
