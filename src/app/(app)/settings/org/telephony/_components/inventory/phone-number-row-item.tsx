'use client';

import { IdChip } from '@/components/common/clipboard/id-chip';
import { TableCell, TableRow } from '@/components/ui/table';
import { PhoneNumberProviderLabel } from '@/server/telephony-phone-numbers/constants/phone-number-provider-labels';
import type { PhoneNumberRow } from '@/server/telephony-phone-numbers/types';

import { PhoneNumberRowActions } from './phone-number-row-actions';

type PhoneNumberRowItemProps = {
  phoneNumber: PhoneNumberRow;
};

export function PhoneNumberRowItem({ phoneNumber }: PhoneNumberRowItemProps) {
  return (
    <TableRow>
      <TableCell className="pl-4">
        <IdChip id={phoneNumber.id} />
      </TableCell>
      <TableCell className="font-mono text-xs">
        {phoneNumber.phoneNumber}
      </TableCell>
      <TableCell className="text-sm">{phoneNumber.name}</TableCell>
      <TableCell className="text-sm">
        {PhoneNumberProviderLabel[phoneNumber.provider]}
      </TableCell>
      <TableCell className="pr-4 text-right">
        <PhoneNumberRowActions phoneNumber={phoneNumber} />
      </TableCell>
    </TableRow>
  );
}
