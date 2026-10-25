import { ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type SampleSourceButtonProps = {
  label: string;
};

export function SampleSourceButton({ label }: SampleSourceButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-background"
          />
        }
      >
        {label}
        <ExternalLinkIcon />
      </TooltipTrigger>
      <TooltipContent>Opens when the call viewer is available</TooltipContent>
    </Tooltip>
  );
}
