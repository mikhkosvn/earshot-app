import { PageHeader } from '@/components/common/page-header/page-header';

export default function RubricPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Rubric"
        description={
          'Define the conditions that decide whether a conversation is marked a success or failure.'
        }
      />
    </div>
  );
}
