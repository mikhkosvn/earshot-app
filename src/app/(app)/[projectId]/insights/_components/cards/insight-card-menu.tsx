'use client';

import { EllipsisIcon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { InsightCardView } from '@/server/insights/types';

import { useNewCategoryAlertMutation } from '../../_hooks/mutations/use-new-category-alert-mutation';
import { useTurnOffInsightsMutation } from '../../_hooks/mutations/use-turn-off-insights-mutation';
import { EnableInsightsDialog } from '../enable/enable-insights-dialog';

type InsightCardMenuProps = {
  card: InsightCardView;
};

export function InsightCardMenu({ card }: InsightCardMenuProps) {
  const projectId = useCurrentProjectId();
  const [editOpen, setEditOpen] = useState(false);
  const newCategoryAlert = useNewCategoryAlertMutation();
  const turnOff = useTurnOffInsightsMutation();
  const scope = { projectId, metricId: card.metricId };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Insights settings for ${card.metricName}`}
            />
          }
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52">
          <DropdownMenuCheckboxItem
            checked={card.alertOnNewCategories}
            disabled={newCategoryAlert.isPending}
            onCheckedChange={(enabled) =>
              newCategoryAlert.mutate({ ...scope, enabled })
            }
            className="text-xs"
          >
            Alert me on new categories
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem
            className="text-xs"
            onClick={() => setEditOpen(true)}
          >
            Edit failure criteria
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="text-xs"
            disabled={turnOff.isPending}
            onClick={() => turnOff.mutate(scope)}
          >
            Turn off insights
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EnableInsightsDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialMetricId={card.metricId}
      />
    </>
  );
}
