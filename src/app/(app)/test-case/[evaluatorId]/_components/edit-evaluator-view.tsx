'use client';

import { EvaluatorsBreadcrumb } from '../../_components/evaluators-breadcrumb';
import { EditEvaluatorForm } from './form/edit-evaluator-form';
import { ChangeHistoryCard } from './history/change-history-card';
import { CompareVersionsCard } from './history/compare-versions-card';

export function EditEvaluatorView() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <EvaluatorsBreadcrumb current="Edit Evaluator" />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <EditEvaluatorForm />
        </div>
        <aside className="flex w-full shrink-0 flex-col gap-4 lg:sticky lg:top-4 lg:w-80">
          <ChangeHistoryCard />
          <CompareVersionsCard />
        </aside>
      </div>
    </div>
  );
}
