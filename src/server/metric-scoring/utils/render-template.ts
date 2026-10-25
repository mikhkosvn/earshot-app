const VARIABLE_PATTERN = /\{\{\s*([^{}]+?)\s*\}\}/g;
const PATH_PART_PATTERN = /[^.[\]"']+/g;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const resolvePath = (data: Record<string, unknown>, path: string) => {
  const parts = path.match(PATH_PART_PATTERN) ?? [];
  let current: unknown = data;
  for (const part of parts) {
    if (!isRecord(current) || !(part in current)) return undefined;
    current = current[part];
  }
  return current;
};

const asText = (value: unknown) => {
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};

export const templateVariables = (text: string) =>
  [...text.matchAll(VARIABLE_PATTERN)].map((match) => match[1]);

export const renderTemplate = (text: string, data: Record<string, unknown>) => {
  const missing: string[] = [];
  const rendered = text.replace(VARIABLE_PATTERN, (whole, path: string) => {
    const value = resolvePath(data, path);
    if (value === undefined || value === null) {
      missing.push(whole);
      return whole;
    }
    return asText(value);
  });
  return { text: rendered, missing };
};
