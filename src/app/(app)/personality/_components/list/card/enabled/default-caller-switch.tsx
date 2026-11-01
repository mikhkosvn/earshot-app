'use client';

import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DefaultCallerSwitchProps {
  name: string;
}

export function DefaultCallerSwitch({ name }: DefaultCallerSwitchProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex" />}>
        <Switch aria-label={`Enable ${name}`} checked disabled />
      </TooltipTrigger>
      <TooltipContent>The default caller is always on.</TooltipContent>
    </Tooltip>
  );
}
