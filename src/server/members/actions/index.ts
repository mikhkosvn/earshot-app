'use server';

import type { MemberRole } from '@/generated/prisma/enums';
import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { listMembers } from '@/server/members/list-members';
import { removeMember } from '@/server/members/remove-member';
import type {
  ListMembersInput,
  MemberRow,
  RemoveMemberInput,
  UpdateMemberRoleInput,
} from '@/server/members/types';
import { updateMemberRole } from '@/server/members/update-member-role';

export async function listMembersAction(
  args: ListMembersInput,
): Promise<MemberRow[]> {
  return listMembers(args);
}

export async function updateMemberRoleAction(
  args: UpdateMemberRoleInput,
): Promise<
  ActionResult<{ id: number; organizationId: number; role: MemberRole }>
> {
  return runAction(() => updateMemberRole(args));
}

export async function removeMemberAction(
  args: RemoveMemberInput,
): Promise<ActionResult<{ id: number; organizationId: number }>> {
  return runAction(() => removeMember(args));
}
