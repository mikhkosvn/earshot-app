'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { Button } from '@/components/ui/button';

import { ApiKeyList } from './api-key-list';
import { CreateApiKeyDialog } from './create-dialog/create-api-key-dialog';

export function ApiKeysSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <SettingsHeaderCard
        title="API Keys"
        description="View your organization API keys"
      >
        <Button type="button" size="sm" onClick={() => setIsCreateOpen(true)}>
          <PlusIcon />
          Create
        </Button>
      </SettingsHeaderCard>
      <ApiKeyList />
      <CreateApiKeyDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
