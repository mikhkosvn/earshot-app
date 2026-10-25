'use client';

import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { usePhoneNumbers } from '../../_hooks/use-phone-numbers';
import { PhoneNumberRowItem } from './phone-number-row-item';
import { PhoneNumberTableEmpty } from './phone-number-table-empty';

export function InventoryCard() {
  const phoneNumbers = usePhoneNumbers();

  return (
    <SettingsCard>
      <h2 className="text-lg font-semibold">Inventory</h2>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20 pl-4">ID</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="pr-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phoneNumbers.map((phoneNumber) => (
              <PhoneNumberRowItem
                key={phoneNumber.id}
                phoneNumber={phoneNumber}
              />
            ))}
            <PhoneNumberTableEmpty />
          </TableBody>
        </Table>
      </div>
    </SettingsCard>
  );
}
