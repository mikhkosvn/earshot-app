import { ArrowUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type WaitingComposerProps = {
  placeholder: string;
};

export function WaitingComposer({ placeholder }: WaitingComposerProps) {
  return (
    <div className="border-t p-3">
      <div className="relative">
        <Textarea
          disabled
          placeholder={placeholder}
          aria-label="Message"
          className="min-h-20 resize-none pr-12"
        />
        <Button
          type="button"
          size="icon-sm"
          disabled
          aria-label="Send"
          className="absolute right-2 bottom-2 rounded-full"
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  );
}
