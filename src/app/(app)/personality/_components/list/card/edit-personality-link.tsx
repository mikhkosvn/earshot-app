import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

type EditPersonalityLinkProps = {
  personalityId: number;
  name: string;
};

export function EditPersonalityLink({
  personalityId,
  name,
}: EditPersonalityLinkProps) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={`Edit ${name}`}
      nativeButton={false}
      render={<Link href={UrlGenerator.personalityEdit({ personalityId })} />}
    >
      <PencilIcon />
    </Button>
  );
}
