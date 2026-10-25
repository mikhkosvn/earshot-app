const VARIABLE_PATTERN = /\{\{\s*([^{}]+?)\s*\}\}/g;
const TRANSCRIPT_PREFIX = 'transcript';
const DEFAULT_INPUTS = ['transcript_json', 'call_end_reason'];
const REGEX_SPECIAL = /[.*+?^${}()|[\]\\]/g;

export const variableCode = (name: string) => `{{${name}}}`;

export const textVariables = (text: string) => [
  ...new Set([...text.matchAll(VARIABLE_PATTERN)].map((match) => match[1])),
];

export const defaultVariables = (text: string) => {
  const usesTranscript = textVariables(text).some((name) =>
    name.startsWith(TRANSCRIPT_PREFIX),
  );
  if (usesTranscript) return [];
  return DEFAULT_INPUTS;
};

export const removeVariable = (text: string, name: string) => {
  const escaped = name.replace(REGEX_SPECIAL, '\\$&');
  return text.replace(new RegExp(`\\{\\{\\s*${escaped}\\s*\\}\\}`, 'g'), '');
};
