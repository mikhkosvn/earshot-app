import { PageHeader } from '@/components/common/page-header/page-header';

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Insights"
        description={
          "Groups the calls that fail each enabled metric into recurring failure modes, updated as new calls come in. Only the metrics enabled here are analysed, up to each metric's daily failure limit."
        }
      />
    </div>
  );
}
