import { PageHeader } from '@/components/common/page-header/page-header';

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Alerts"
        description={
          'See which alerts fired, when, and why. Configure new ones below.'
        }
      />
    </div>
  );
}
