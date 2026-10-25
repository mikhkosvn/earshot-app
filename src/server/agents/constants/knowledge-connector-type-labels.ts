import { KnowledgeConnectorType } from '@/generated/prisma/enums';

export const KnowledgeConnectorTypeLabel: Record<
  KnowledgeConnectorType,
  string
> = {
  [KnowledgeConnectorType.google_bigquery]: 'Google BigQuery',
  [KnowledgeConnectorType.website_scraper]: 'Website Scraper',
};
