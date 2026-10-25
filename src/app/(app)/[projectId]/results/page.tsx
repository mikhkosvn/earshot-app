import { PageHeader } from '@/components/common/page-header/page-header';

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Results"
        description={
          'Browse the results of your evaluator runs, drill into individual call transcripts and metric scores, and compare runs to see how your agent is performing.'
        }
      />
    </div>
  );
}
