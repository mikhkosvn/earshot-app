import type { ReactNode } from 'react';

type SettingsHeaderCardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function SettingsHeaderCard({
  title,
  description,
  children,
}: SettingsHeaderCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border bg-background px-4 py-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
