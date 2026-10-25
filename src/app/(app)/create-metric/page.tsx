import { PageHeader } from '@/components/common/page-header/page-header';

export default function CreateMetricPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Create Metrics"
        description={
          'Your AI agent is Main Agent and User is Test Agent (Earshot)'
        }
      />
    </div>
  );
}
