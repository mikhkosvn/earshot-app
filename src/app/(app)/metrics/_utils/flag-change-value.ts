import { FlagChange } from '../_constants/flag-change';

export const flagChangeValue = (change: FlagChange) => {
  if (change === FlagChange.on) return true;
  if (change === FlagChange.off) return false;
  return undefined;
};
