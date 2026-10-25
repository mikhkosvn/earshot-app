import { Link2OffIcon } from 'lucide-react';

import { EmptyState } from '@/components/common/empty-state';

export function InvalidShareLink() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <EmptyState
        icon={Link2OffIcon}
        title="This link is not valid or has expired."
        description="Ask the person who shared it for a new link."
      />
    </div>
  );
}
