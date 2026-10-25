import type { ReactNode } from 'react';

interface OverviewSectionProps {
  title: string;
  children: ReactNode;
}

export function OverviewSection({ title, children }: OverviewSectionProps) {
  return (
    <section className="overflow-hidden rounded-lg border bg-card">
      <h2 className="border-b px-3 py-2 text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
}
