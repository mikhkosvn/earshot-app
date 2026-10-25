export type LogFieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | LogFieldValue[]
  | { [key: string]: LogFieldValue };

export type LogFields = Record<string, LogFieldValue>;

export type LogAttributes = Record<string, string | number | boolean>;
