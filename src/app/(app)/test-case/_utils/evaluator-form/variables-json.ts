interface Variable {
  key: string;
  value: string;
}

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

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

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
  if (!isPlainObject(value)) {
    return {
      variables: null,
      error: 'Enter a JSON object, for example {"name": "Sarah"}.',
    };
  }
  return {
    variables: Object.entries(value).map(([key, entry]) => ({
      key,
      value: String(entry),
    })),
    error: null,
  };
};
