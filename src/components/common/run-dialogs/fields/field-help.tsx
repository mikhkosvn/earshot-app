import type { ReactNode } from 'react';

import { FieldDescription } from '@/components/ui/field';

type FieldHelpProps = {
  children?: ReactNode;
};

export function FieldHelp({ children }: FieldHelpProps) {
  if (!children) return null;
  return <FieldDescription className="text-xs">{children}</FieldDescription>;
}
