'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../../_service';
import { OptionSelect } from '../option-select';
import { PhoneNumberLabel } from './phone-number-label';

interface PhoneNumberSelectProps {
  id?: string;
  value: number | null;
  onValueChange: (phoneNumberId: number | null) => void;
  placeholder?: string;
}

export function PhoneNumberSelect({
  id,
  value,
  onValueChange,
  placeholder = 'None',
}: PhoneNumberSelectProps) {
  const projectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...EvaluatorService.getPhoneNumbersQuery({ projectId }),
    select: (phoneNumbers) =>
      phoneNumbers.map((phoneNumber) => ({
        value: phoneNumber.id,
        label: <PhoneNumberLabel phoneNumber={phoneNumber} />,
      })),
  });

  return (
    <OptionSelect
      id={id}
      items={[{ value: null, label: 'None' }, ...items]}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
    />
  );
}
