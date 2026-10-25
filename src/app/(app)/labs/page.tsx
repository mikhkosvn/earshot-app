import { PageHeader } from '@/components/common/page-header/page-header';

export default function LabsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Labs"
        description={
          "Optimization Labs let you iteratively refine a metric's definition against real results, tuning its description and triggers until it scores conversations the way you intend."
        }
      />
    </div>
  );
}
