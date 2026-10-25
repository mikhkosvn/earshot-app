import type { ReactNode } from 'react';

interface SettingsGroupProps {
  title: string;
  children: ReactNode;
}

export function SettingsGroup({ title, children }: SettingsGroupProps) {
  return (
    <section className="flex flex-col gap-4 border-b pb-5 last:border-b-0 last:pb-0">
      <h2 className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
