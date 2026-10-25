'use client';

import { useWatch } from 'react-hook-form';

import { KnowledgeConnectorType } from '@/generated/prisma/enums';
import type { KnowledgeConnectorFormValues } from '@/server/agents/types';

import { BigQueryFields } from './big-query-fields';
import { WebsiteScraperFields } from './website-scraper-fields';

export function ConnectorSourceFields() {
  const type = useWatch<KnowledgeConnectorFormValues, 'type'>({ name: 'type' });
  if (type === KnowledgeConnectorType.website_scraper) {
    return <WebsiteScraperFields />;
  }
  return <BigQueryFields />;
}
