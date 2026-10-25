export const SpecSource = {
  upload: 'upload',
  paste: 'paste',
} as const;

export type SpecSource = (typeof SpecSource)[keyof typeof SpecSource];
