'use client';

import { GripVerticalIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';

interface PlotDragHandleProps extends ComponentProps<typeof Button> {
  plotName: string;
}

export function PlotDragHandle({ plotName, ...props }: PlotDragHandleProps) {
  return (
    <Button
      {...props}
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={`Drag ${plotName}`}
      className="cursor-grab text-muted-foreground active:cursor-grabbing"
    >
      <GripVerticalIcon />
    </Button>
  );
}
