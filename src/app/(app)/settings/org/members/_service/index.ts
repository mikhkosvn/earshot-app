import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listMembersAction } from '@/server/members/actions';

export const MembersKey = {
  list: 'organization-members',
  updateRole: 'update-member-role',
  remove: 'remove-member',
} as const;

export type MembersKey = (typeof MembersKey)[keyof typeof MembersKey];

export class MembersService {
  static readonly updateRoleMutationKey = [MembersKey.updateRole];
  static readonly removeMemberMutationKey = [MembersKey.remove];

  static getMembersQuery(args: { organizationId: number }) {
    return queryOptions({
      queryKey: [MembersKey.list, args],
      queryFn: () => deferAction(() => listMembersAction(args)),
    });
  }
}
