'use client';

import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useSelectedEvaluatorIds } from '../../../_hooks/table/use-selected-evaluator-ids';
import { ExportEvaluatorsDialog } from '../../actions/export-evaluators-dialog';

export function ExportButton() {
  const selectedIds = useSelectedEvaluatorIds();
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
