import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';

export type NavItem = {
  label: string;
  icon: LucideIcon;
  href: (projectId: number) => Route;
  matchPaths?: Route[];
  exact?: boolean;
};

export type NavGroup = {
  label: string | null;
  items: NavItem[];
};
