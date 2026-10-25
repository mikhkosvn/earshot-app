import type { ReactNode } from 'react';

type AdvancedGroupProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AdvancedGroup({
  title,
  description,
  children,
}: AdvancedGroupProps) {
  return (
    <div className="flex flex-col gap-3 border-b pb-5 last:border-b-0">
      <div>
        <h3 className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
