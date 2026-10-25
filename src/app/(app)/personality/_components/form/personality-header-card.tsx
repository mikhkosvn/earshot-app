import type { ReactNode } from 'react';

type PersonalityHeaderCardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PersonalityHeaderCard({
  title,
  description,
  children,
}: PersonalityHeaderCardProps) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border bg-background px-3 py-2.5">
      <div>
        <h1 className="text-base font-semibold">{title}</h1>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
