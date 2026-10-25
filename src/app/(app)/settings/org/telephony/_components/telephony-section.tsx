'use client';

import { useCurrentOrganizationId } from '../../_hooks/use-current-organization-id';
import { ByotPolicyForm } from './byot-policy-form';
import { ImportPhoneNumberCard } from './import/import-phone-number-card';
import { InventoryCard } from './inventory/inventory-card';

export function TelephonySection() {
  const organizationId = useCurrentOrganizationId();

  return (
    <div className="flex flex-col gap-3" key={organizationId}>
      <ByotPolicyForm />
      <ImportPhoneNumberCard />
      <InventoryCard />
    </div>
  );
}
