import { PageHeader } from '@/components/common/page-header/page-header';

export default function CreateEvaluatorPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Create an Evaluator"
        description={
          'Describe a real conversation or failure mode. Earshot will turn it into test scenarios you can review and refine here.'
        }
      />
    </div>
  );
}
