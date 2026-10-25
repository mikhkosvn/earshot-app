import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: (projectId: number) => Route;
  matchPaths?: readonly Route[];
  exact?: boolean;
}

export interface NavGroup {
  label: string | null;
  items: readonly NavItem[];
}
