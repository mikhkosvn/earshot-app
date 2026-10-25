'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCallViewParam } from '../../_hooks/call-params/use-call-view-param';
import { CallService } from '../../_service';

const viewLabel = (name: string | undefined) => name ?? 'Select View';

export function SelectViewMenu() {
  const projectId = useCurrentProjectId();
  const { viewId, setView } = useCallViewParam();
  const { data: views } = useSuspenseQuery(
    CallService.getSavedViewsQuery({ projectId }),
  );
  const current = views.find((view) => view.id === viewId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="w-48 justify-between text-xs font-normal"
          />
        }
      >
        <span className="truncate">{viewLabel(current?.name)}</span>
        <ChevronDownIcon className="text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuItem
          data-current={viewId === null}
          className="text-xs data-[current=true]:bg-muted"
          onClick={() => setView(null)}
        >
          None
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {views.map((view) => (
          <DropdownMenuItem
            key={view.id}
            data-current={view.id === viewId}
            className="text-xs data-[current=true]:bg-muted"
            onClick={() => setView(view.id)}
          >
            <span className="truncate">{view.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
