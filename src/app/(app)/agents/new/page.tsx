import { Suspense } from 'react';

import { CreateAgentData } from './_components/create-agent-data';
import { CreateAgentSkeleton } from './_components/create-agent-skeleton';

export default function CreateAgentPage() {
  return (
    <div className="flex justify-center p-3">
      <Suspense fallback={<CreateAgentSkeleton />}>
        <CreateAgentData />
      </Suspense>
    </div>
  );
}
