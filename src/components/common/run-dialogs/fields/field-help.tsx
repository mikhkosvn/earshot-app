import type { ReactNode } from 'react';

import { FieldDescription } from '@/components/ui/field';

interface FieldHelpProps {
  children?: ReactNode;
}

export function FieldHelp({ children }: FieldHelpProps) {
  if (!children) return null;
  return <FieldDescription className="text-xs">{children}</FieldDescription>;
}
