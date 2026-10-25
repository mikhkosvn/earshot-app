import type { ReactNode } from 'react';

import { FieldDescription } from '@/components/ui/field';

type SettingFieldDescriptionProps = {
  description?: ReactNode;
};

export function SettingFieldDescription({
  description,
}: SettingFieldDescriptionProps) {
  if (!description) return null;

  return <FieldDescription className="text-xs">{description}</FieldDescription>;
}
