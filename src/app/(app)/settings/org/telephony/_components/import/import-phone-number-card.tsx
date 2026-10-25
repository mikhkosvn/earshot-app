import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';

import { ImportPhoneNumberForm } from './import-phone-number-form';

export function ImportPhoneNumberCard() {
  return (
    <SettingsCard>
      <h2 className="text-base font-semibold">BYOT Inventory and Import</h2>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium">Import New External Number</h3>
        <p className="text-xs text-muted-foreground">
          This links the number to your user ID for ownership tracking.
        </p>
      </div>
      <ImportPhoneNumberForm />
    </SettingsCard>
  );
}
