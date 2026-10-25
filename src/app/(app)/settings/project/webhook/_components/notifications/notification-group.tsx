import type { ReactNode } from 'react';

type NotificationGroupProps = {
  title: string;
  children: ReactNode;
};

export function NotificationGroup({ title, children }: NotificationGroupProps) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="flex flex-col gap-4 pl-4">{children}</div>
    </section>
  );
}
