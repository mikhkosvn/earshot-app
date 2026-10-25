const JSON_ERROR = { message: 'Enter a JSON array of strings.' };

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

export const parseEnumJson = (text: string) => {
  try {
    const value: unknown = JSON.parse(text);
    if (!isStringArray(value)) return null;
    return value;
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
