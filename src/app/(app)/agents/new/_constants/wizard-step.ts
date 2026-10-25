export const WizardStep = {
  connection: 'connection',
  basicInfo: 'basicInfo',
} as const;

export type WizardStep = (typeof WizardStep)[keyof typeof WizardStep];
