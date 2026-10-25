'use client';

import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ExportEvaluatorsDialog } from '../../actions/export-evaluators-dialog';

type ExportButtonProps = {
  selectedIds: number[];
};

export function ExportButton({ selectedIds }: ExportButtonProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={selectedIds.length === 0}
        onClick={() => setOpen(true)}
      >
        <DownloadIcon />
        Export ({selectedIds.length})
      </Button>
      <ExportEvaluatorsDialog
        open={isOpen}
        onOpenChange={setOpen}
        evaluatorIds={selectedIds}
      />
    </>
  );
}
