import type { ReactNode } from 'react';

type ExpandAllIconProps = {
  isExpanded: boolean;
  expandIcon: ReactNode;
  collapseIcon: ReactNode;
};

export function ExpandAllIcon({
  isExpanded,
  expandIcon,
  collapseIcon,
}: ExpandAllIconProps) {
  if (isExpanded) return collapseIcon;
  return expandIcon;
}
