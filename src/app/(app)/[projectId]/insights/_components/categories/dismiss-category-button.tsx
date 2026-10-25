'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useDismissCategoryMutation } from '../../_hooks/mutations/use-dismiss-category-mutation';

interface DismissCategoryButtonProps {
  categoryId: number;
}

export function DismissCategoryButton({
  categoryId,
}: DismissCategoryButtonProps) {
  const dismiss = useDismissCategoryMutation();

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      className="w-fit text-[11px]"
      disabled={dismiss.isPending}
      onClick={() => dismiss.mutate({ categoryId })}
    >
      <XIcon />
      Dismiss category
    </Button>
  );
}
