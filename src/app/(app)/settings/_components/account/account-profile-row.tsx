import type { ReactNode } from 'react';

type AccountProfileRowProps = {
  label: string;
  value: string;
  children?: ReactNode;
};

export function AccountProfileRow({
  label,
  value,
  children,
}: AccountProfileRowProps) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium" suppressHydrationWarning>
          {value}
        </p>
      </div>
      {children}
    </div>
  );
}
