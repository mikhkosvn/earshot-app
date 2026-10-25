'use client';

import { KeyRoundIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import type { ApiKeyRow } from '@/server/api-keys/types/api-key-row';

import { apiKeyLabel } from '../_utils/api-key-values';
import { ApiKeyProjectBadge } from './api-key-project-badge';
import { DeleteApiKeyButton } from './delete-api-key-button';

interface ApiKeyCardProps {
  apiKey: ApiKeyRow;
}

export function ApiKeyCard({ apiKey }: ApiKeyCardProps) {
  const label = apiKeyLabel(apiKey.name);

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">{label}</p>
        <ApiKeyProjectBadge projectName={apiKey.projectName} />
      </div>
      <div className="flex items-center gap-2">
        <InputGroup className="bg-background">
          <InputGroupAddon>
            <KeyRoundIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={apiKey.maskedKey}
            aria-label={`${label} value`}
            disabled
            readOnly
            className="font-mono text-xs"
          />
        </InputGroup>
        <DeleteApiKeyButton apiKeyId={apiKey.id} label={label} />
      </div>
    </div>
  );
}
