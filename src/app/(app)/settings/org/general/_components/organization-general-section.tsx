'use client';

import { useCurrentOrganizationId } from '../../_hooks/use-current-organization-id';
import { OrganizationGeneralForm } from './organization-general-form';
import { OrganizationProjectsCard } from './organization-projects-card';

export function OrganizationGeneralSection() {
  const organizationId = useCurrentOrganizationId();

  return (
    <div className="flex flex-col gap-3">
      <OrganizationGeneralForm key={organizationId} />
      <OrganizationProjectsCard />
    </div>
  );
}
