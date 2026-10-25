export const MetadataFieldType = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
} as const;

export type MetadataFieldType =
  (typeof MetadataFieldType)[keyof typeof MetadataFieldType];
