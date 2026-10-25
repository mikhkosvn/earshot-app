export type GeneratedApiKey = {
  plainKey: string;
  keyPrefix: string;
  keyHash: string;
};

export type ApiKeyAuth = {
  organizationId: number;
  projectId: number | null;
};
