import type { LucideIcon } from 'lucide-react';

import { CardDetailRow } from './card-detail-row';

interface ForkedRowProps {
  forked: boolean;
  icon: LucideIcon;
}

export function ForkedRow({ forked, icon }: ForkedRowProps) {
  if (!forked) return null;
  return <CardDetailRow icon={icon} text="Fork" />;
}
