const JSON_ERROR = { message: 'Enter a JSON array of strings.' };

export const parseEnumJson = (text: string) => {
  try {
    const value: unknown = JSON.parse(text);
    if (!Array.isArray(value)) return null;
    if (!value.every((item) => typeof item === 'string')) return null;
    return value as string[];
  } catch {
    return null;
  }
};

export const enumJsonError = (text: string) => {
  if (parseEnumJson(text)) return undefined;
  return JSON_ERROR;
};

export const formatEnumJson = (values: string[]) =>
  JSON.stringify(values, null, 2);
