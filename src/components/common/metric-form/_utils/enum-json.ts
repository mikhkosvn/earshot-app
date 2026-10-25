import { z } from 'zod';

const JSON_ERROR = { message: 'Enter a JSON array of strings.' };

const enumValuesJsonSchema = z.array(z.string());

export const parseEnumJson = (text: string) => {
  try {
    const value: unknown = JSON.parse(text);
    return enumValuesJsonSchema.safeParse(value).data ?? null;
  } catch {
    return null;
  }
};

export const enumJsonError = (text: string) => {
  if (parseEnumJson(text)) return undefined;
  return JSON_ERROR;
};

export const formatEnumJson = (values: readonly string[]) =>
  JSON.stringify(values, null, 2);
