import { z } from 'zod';

interface Variable {
  key: string;
  value: string;
}

const variablesJsonSchema = z.record(z.string(), z.unknown());

export const variablesToJson = (variables: readonly Variable[]) =>
  JSON.stringify(
    Object.fromEntries(
      variables
        .filter((variable) => variable.key.trim())
        .map((variable) => [variable.key, variable.value]),
    ),
    null,
    2,
  );

const readJson = (text: string) => {
  try {
    const value: unknown = JSON.parse(text);
    return { value };
  } catch {
    return { value: undefined };
  }
};

export const parseVariablesJson = (text: string) => {
  const { value } = readJson(text);
  const parsed = variablesJsonSchema.safeParse(value);
  if (!parsed.success) {
    return {
      variables: null,
      error: 'Enter a JSON object, for example {"name": "Sarah"}.',
    };
  }
  return {
    variables: Object.entries(parsed.data).map(([key, entry]) => ({
      key,
      value: String(entry),
    })),
    error: null,
  };
};
