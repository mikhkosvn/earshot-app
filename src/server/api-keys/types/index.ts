export interface GeneratedApiKey {
  plainKey: string;
  keyPrefix: string;
  keyHash: string;
}

export interface ApiKeyAuth {
  organizationId: number;
  projectId: number | null;
}
