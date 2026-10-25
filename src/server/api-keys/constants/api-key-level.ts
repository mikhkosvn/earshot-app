export const ApiKeyLevel = {
  organization: 'organization',
  project: 'project',
} as const;

export type ApiKeyLevel = (typeof ApiKeyLevel)[keyof typeof ApiKeyLevel];

export const ApiKeyLevelLabel: Record<ApiKeyLevel, string> = {
  [ApiKeyLevel.organization]: 'Organization Level',
  [ApiKeyLevel.project]: 'Project Level',
};
