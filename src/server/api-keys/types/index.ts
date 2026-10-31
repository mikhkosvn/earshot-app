export interface GeneratedApiKey {
  plainKey: string;
  keyPrefix: string;
  keyHash: string;
}

export interface ApiKeyAuth {
  apiKeyId: number;
  organizationId: number;
  projectId: number | null;
}
