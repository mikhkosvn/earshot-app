import type { LucideIcon } from 'lucide-react';

interface SectionIconProps {
  icon?: LucideIcon;
}

export function SectionIcon({ icon: Icon }: SectionIconProps) {
  if (!Icon) return null;
  return <Icon className="size-4 shrink-0" />;
}
