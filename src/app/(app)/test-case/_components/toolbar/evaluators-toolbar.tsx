'use client';

import { ActionsMenu } from './selection/actions-menu';
import { AddEvaluatorLink } from './add-evaluator-link';
import { DeleteEvaluatorsButton } from './selection/delete-evaluators-button';
import { EvaluatorSearch } from './evaluator-search';
import { ExportButton } from './selection/export-button';
import { FiltersButton } from './filters-button';
import { GenerateEvaluatorsButton } from './generate-evaluators-button';
import { ImproveScenariosButton } from './improve-scenarios-button';
import { RunEvaluatorsButton } from './run/run-evaluators-button';
import { RunFromFileButton } from './run/run-from-file-button';
import { TestProfilesButton } from './test-profiles-button';

interface EvaluatorsToolbarProps {
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onImproveOpen: () => void;
}

export function EvaluatorsToolbar({
  selectedIds,
  onSelectionChange,
  onImproveOpen,
}: EvaluatorsToolbarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <EvaluatorSearch />
        <TestProfilesButton />
        <FiltersButton />
        <AddEvaluatorLink />
        <RunFromFileButton />
        <GenerateEvaluatorsButton />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ExportButton selectedIds={selectedIds} />
        <ActionsMenu
          selectedIds={selectedIds}
          onSelectionChange={onSelectionChange}
        />
        <ImproveScenariosButton onImproveOpen={onImproveOpen} />
        <RunEvaluatorsButton selectedIds={selectedIds} />
        <DeleteEvaluatorsButton
          selectedIds={selectedIds}
          onDeleted={() => onSelectionChange([])}
        />
      </div>
    </div>
  );
}
