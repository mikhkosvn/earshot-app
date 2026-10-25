import { PageHeader } from '@/components/common/page-header/page-header';

export default function PersonalityPage() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <PageHeader
        title="Personality"
        description={
          'Define the simulated caller personas your evaluators role-play, controlling tone, mood, and behavior to test how your agent handles different kinds of callers.'
        }
      />
    </div>
  );
}
