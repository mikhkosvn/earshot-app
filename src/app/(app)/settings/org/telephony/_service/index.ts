import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listPhoneNumbersAction } from '@/server/telephony-phone-numbers/actions';

export const TelephonyKey = {
  phoneNumbers: 'telephony-phone-numbers',
  create: 'create-telephony-phone-number',
  update: 'update-telephony-phone-number',
  delete: 'delete-telephony-phone-number',
} as const;

export type TelephonyKey = (typeof TelephonyKey)[keyof typeof TelephonyKey];

export class TelephonyService {
  static readonly createPhoneNumberMutationKey = [TelephonyKey.create];
  static readonly updatePhoneNumberMutationKey = [TelephonyKey.update];
  static readonly deletePhoneNumberMutationKey = [TelephonyKey.delete];

  static getPhoneNumbersQuery(args: { organizationId: number }) {
    return queryOptions({
      queryKey: [TelephonyKey.phoneNumbers, args],
      queryFn: () => deferAction(() => listPhoneNumbersAction(args)),
    });
  }
}
