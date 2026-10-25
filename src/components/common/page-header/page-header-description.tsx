import type { ReactNode } from 'react';

interface PageHeaderDescriptionProps {
  description?: ReactNode;
}

export function PageHeaderDescription({
  description,
}: PageHeaderDescriptionProps) {
  if (!description) return null;

  return <p className="text-xs text-muted-foreground">{description}</p>;
}
