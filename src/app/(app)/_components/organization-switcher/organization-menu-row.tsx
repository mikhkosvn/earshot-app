'use client';

import { BuildingIcon } from 'lucide-react';

import { useSwitchOrganizationMutation } from '@/app/(app)/_hooks/mutations/organization-switcher/use-switch-organization-mutation';
import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import type { OrganizationSummary } from '@/server/organizations/types';

interface OrganizationMenuRowProps {
  organization: OrganizationSummary;
}

export function OrganizationMenuRow({
  organization,
}: OrganizationMenuRowProps) {
  const project = useCurrentProject();
  const switchOrganization = useSwitchOrganizationMutation();
  const isCurrent = organization.id === project.organizationId;

  return (
    <DropdownMenuItem
      data-current={isCurrent}
      className="gap-2 text-xs data-[current=true]:bg-muted"
      onClick={() => {
        if (isCurrent) return;
        switchOrganization.mutate({ organizationId: organization.id });
      }}
    >
      <BuildingIcon className="text-muted-foreground" />
      <span className="truncate">{organization.name}</span>
    </DropdownMenuItem>
  );
}
