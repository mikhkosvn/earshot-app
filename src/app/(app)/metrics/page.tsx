import { PageHeader } from '@/components/common/page-header/page-header';

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Metrics"
        description={
          'Define what to measure on every call from predefined checks to custom LLM-judge and Python metrics then reuse them across simulations and observability.'
        }
      />
    </div>
  );
}
