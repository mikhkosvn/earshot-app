import type { ReactNode } from 'react';

interface MonitorFormSectionProps {
  title: string;
  children: ReactNode;
}

export function MonitorFormSection({
  title,
  children,
}: MonitorFormSectionProps) {
  return (
    <section className="rounded-lg border bg-background">
      <h3 className="border-b bg-muted/40 px-3 py-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      <div className="flex flex-col gap-3 p-3">{children}</div>
    </section>
  );
}
