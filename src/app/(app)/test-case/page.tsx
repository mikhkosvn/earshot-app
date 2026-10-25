import { PageHeader } from '@/components/common/page-header/page-header';

export default function EvaluatorsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Evaluators"
        description={
          'Evaluators are test scenarios that simulate real conversations against your agent, each paired with a persona and the metrics it should pass.'
        }
      />
    </div>
  );
}
