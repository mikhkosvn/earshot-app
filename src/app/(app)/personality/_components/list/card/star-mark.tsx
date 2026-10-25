import type { LucideIcon } from 'lucide-react';

interface StarMarkProps {
  starred: boolean;
  icon: LucideIcon;
}

export function StarMark({ starred, icon: Icon }: StarMarkProps) {
  if (!starred) return null;
  return (
    <Icon
      aria-label="Starred"
      className="mt-0.5 size-4 shrink-0 fill-amber-400 text-amber-400"
    />
  );
}
