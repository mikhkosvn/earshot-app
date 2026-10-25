'use client';

import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SidebarCollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarCollapseButton({
  isCollapsed,
  onToggle,
}: SidebarCollapseButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label="Collapse sidebar"
      aria-pressed={isCollapsed}
      className="absolute top-3.5 right-3 size-4 text-muted-foreground group-data-[collapsed=true]/sidebar:right-5"
      onClick={onToggle}
    >
      <ChevronLeftIcon className="size-3 transition-transform group-data-[collapsed=true]/sidebar:rotate-180" />
    </Button>
  );
}
