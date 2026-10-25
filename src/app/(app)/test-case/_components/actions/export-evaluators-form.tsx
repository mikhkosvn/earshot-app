'use client';

import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  EvaluatorExportButtonLabel,
  EvaluatorExportFormat,
  EvaluatorExportFormatLabel,
} from '@/server/evaluators/constants/evaluator-export';

import { useExportEvaluatorsMutation } from '../../_hooks/mutations/evaluator-actions/use-export-evaluators-mutation';
import { OptionSelect } from '../fields/option-select';

const FORMAT_ITEMS = Object.values(EvaluatorExportFormat).map((format) => ({
  value: format,
  label: EvaluatorExportFormatLabel[format],
}));

interface ExportEvaluatorsFormProps {
  evaluatorIds: number[];
  onDone: () => void;
}

export function ExportEvaluatorsForm({
  evaluatorIds,
  onDone,
}: ExportEvaluatorsFormProps) {
  const projectId = useCurrentProjectId();
  const [format, setFormat] = useState<EvaluatorExportFormat>(
    EvaluatorExportFormat.csv,
  );
  const exportEvaluators = useExportEvaluatorsMutation();

  return (
    <div className="flex flex-col gap-4">
      <Field className="gap-1.5">
        <FieldLabel htmlFor="export-format">Export format</FieldLabel>
        <OptionSelect
          id="export-format"
          items={FORMAT_ITEMS}
          value={format}
          onValueChange={(next) => {
            if (next === null) return;
            setFormat(next);
          }}
          placeholder="Select format"
        />
      </Field>
      <p className="text-xs text-muted-foreground">
        {evaluatorIds.length} scenario(s) selected for export
      </p>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button
          type="button"
          disabled={exportEvaluators.isPending}
          onClick={() =>
            exportEvaluators.mutate(
              { projectId, evaluatorIds, format },
              {
                onSuccess: (result) => {
                  if (!result.ok) return;
                  onDone();
                },
              },
            )
          }
        >
          <DownloadIcon />
          {EvaluatorExportButtonLabel[format]}
        </Button>
      </DialogFooter>
    </div>
  );
}
