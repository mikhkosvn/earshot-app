import type { ReactNode } from 'react';

interface SelectedTileBadgeProps {
  selected: boolean;
  children: ReactNode;
}

export function SelectedTileBadge({
  selected,
  children,
}: SelectedTileBadgeProps) {
  if (!selected) return null;

  return (
    <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-foreground text-background">
      {children}
    </span>
  );
}
