import { CreationMethod } from '@/generated/prisma/enums';

export const CreationMethodLabel: Record<CreationMethod, string> = {
  [CreationMethod.manual]: 'Manual',
  [CreationMethod.manual_with_generate]: 'Manual with Generate',
  [CreationMethod.auto_generated]: 'Auto Generated',
  [CreationMethod.json_spec]: 'JSON Test Suite Spec',
};
