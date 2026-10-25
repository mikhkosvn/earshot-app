export const FlagChange = {
  noChange: 'no_change',
  on: 'on',
  off: 'off',
} as const;

export type FlagChange = (typeof FlagChange)[keyof typeof FlagChange];

export const FlagChangeLabel: Record<FlagChange, string> = {
  [FlagChange.noChange]: 'No change',
  [FlagChange.on]: 'On',
  [FlagChange.off]: 'Off',
};

export const FLAG_CHANGE_ITEMS = Object.values(FlagChange).map((value) => ({
  value,
  label: FlagChangeLabel[value],
}));
