import { PageHeader } from '@/components/common/page-header/page-header';

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Agents"
        description={
          'Agents are the configurations you set up in Earshot, describing the agent you want to test along with how it connects, so you can generate evaluators and run simulations against it.'
        }
      />
    </div>
  );
}
