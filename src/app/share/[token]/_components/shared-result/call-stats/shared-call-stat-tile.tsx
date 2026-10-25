import type { ReactNode } from 'react';

interface SharedCallStatTileProps {
  label: string;
  children: ReactNode;
}

export function SharedCallStatTile({
  label,
  children,
}: SharedCallStatTileProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm">
      <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
      {children}
    </div>
  );
}
