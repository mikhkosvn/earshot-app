import type { ReactNode } from 'react';

import { FieldLabel } from '@/components/ui/field';

type RubricFieldLabelProps = {
  htmlFor?: string;
  children: ReactNode;
};

export function RubricFieldLabel({ htmlFor, children }: RubricFieldLabelProps) {
  return (
    <FieldLabel
      htmlFor={htmlFor}
      className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
    >
      {children}
    </FieldLabel>
  );
}
