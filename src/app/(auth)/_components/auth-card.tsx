import type { ReactNode } from 'react';

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Earshot
        </p>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
