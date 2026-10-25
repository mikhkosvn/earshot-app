import { PageHeader } from '@/components/common/page-header/page-header';

export default function MonitorsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Synthetic Monitors"
        description={
          'Recurring probe calls to your live agent. No production data required.'
        }
      />
    </div>
  );
}
