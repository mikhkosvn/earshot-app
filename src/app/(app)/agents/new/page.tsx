import { PageHeader } from '@/components/common/page-header/page-header';

export default function CreateAgentPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Create an Agent"
        description={'Create an agent to start testing your voice assistant'}
      />
    </div>
  );
}
