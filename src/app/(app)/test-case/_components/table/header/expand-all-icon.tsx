import type { ReactNode } from 'react';

interface ExpandAllIconProps {
  isExpanded: boolean;
  expandIcon: ReactNode;
  collapseIcon: ReactNode;
}

export function ExpandAllIcon({
  isExpanded,
  expandIcon,
  collapseIcon,
}: ExpandAllIconProps) {
  if (isExpanded) return collapseIcon;
  return expandIcon;
}
