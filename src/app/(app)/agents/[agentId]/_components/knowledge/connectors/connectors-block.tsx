'use client';

import { PlusIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { AddConnectorDialog } from './add-connector-dialog';
import { ConnectorList } from './connector-list';

export function ConnectorsBlock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold">Connectors</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <PlusIcon />
          Add Connector
        </Button>
      </div>
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <ConnectorList />
        </Suspense>
      </QueryErrorBoundary>
      <AddConnectorDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
