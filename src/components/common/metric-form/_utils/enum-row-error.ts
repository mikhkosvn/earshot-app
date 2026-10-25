import type { FieldError } from 'react-hook-form';

export const enumRowError = (error: FieldError | undefined, index: number) => {
  if (!error || !Array.isArray(error)) return undefined;
  const item: unknown = error[index];
  if (!item || typeof item !== 'object' || !('message' in item)) {
    return undefined;
  }
  return { message: String(item.message) };
};
