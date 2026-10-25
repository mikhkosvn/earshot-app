import { PageHeader } from '@/components/common/page-header/page-header';

export default function CreatePersonalityPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Create personality"
        description={
          'Configure how the Test Agent (Earshot) should behave and respond to users by defining a custom personality.'
        }
      />
    </div>
  );
}
