export const BooleanChoice = {
  true: 'true',
  false: 'false',
  none: 'none',
} as const;

export type BooleanChoice = (typeof BooleanChoice)[keyof typeof BooleanChoice];

export const BOOLEAN_CHOICE_ITEMS = [
  { value: BooleanChoice.true, label: 'True' },
  { value: BooleanChoice.false, label: 'False' },
  { value: BooleanChoice.none, label: 'None' },
];
