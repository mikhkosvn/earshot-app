import type { ReactNode } from 'react';

import { FieldDescription } from '@/components/ui/field';

interface SliderHelpProps {
  help?: ReactNode;
}

export function SliderHelp({ help }: SliderHelpProps) {
  if (!help) return null;
  return <FieldDescription className="text-xs">{help}</FieldDescription>;
}
