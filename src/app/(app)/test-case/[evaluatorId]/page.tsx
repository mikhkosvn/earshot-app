import { PageHeader } from '@/components/common/page-header/page-header';

export default function EditEvaluatorPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Edit Evaluator"
        description={'Update your evaluator settings.'}
      />
    </div>
  );
}
