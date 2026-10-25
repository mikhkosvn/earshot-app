'use client';

import { useWatch } from 'react-hook-form';

import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

import { useIsImportingPhoneNumber } from './use-is-importing-phone-number';

export const useImportNumberDisabled = () => {
  const [phoneNumber, name, authToken] = useWatch<
    ImportPhoneNumberFormValues,
    ['phoneNumber', 'name', 'authToken']
  >({ name: ['phoneNumber', 'name', 'authToken'] });
  const isImporting = useIsImportingPhoneNumber();
  return isImporting || !phoneNumber || !name.trim() || !authToken.trim();
};
