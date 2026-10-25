import type { PhoneNumberOption } from '@/server/evaluators/types';

interface PhoneNumberLabelProps {
  phoneNumber: PhoneNumberOption;
}

export function PhoneNumberLabel({ phoneNumber }: PhoneNumberLabelProps) {
  if (!phoneNumber.name) return phoneNumber.phoneNumber;
  return (
    <span className="flex items-center gap-2">
      {phoneNumber.phoneNumber}
      <span className="text-muted-foreground">{phoneNumber.name}</span>
    </span>
  );
}
