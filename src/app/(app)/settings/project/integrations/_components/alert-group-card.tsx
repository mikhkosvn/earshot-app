import type { ReactNode } from 'react';

type AlertGroupCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AlertGroupCard({
  title,
  description,
  children,
}: AlertGroupCardProps) {
  return (
    <section className="overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-col gap-0.5 border-b bg-muted/40 px-3 py-2.5">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-4 p-3">{children}</div>
    </section>
  );
}
