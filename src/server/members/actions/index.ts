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
import { MembersActionOperation } from '@/server/members/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listMembersAction(
  args: ListMembersInput,
): Promise<MemberRow[]> {
  return withActionEvent(MembersActionOperation.listMembers, () =>
    listMembers(args),
  );
}

export async function updateMemberRoleAction(
  args: UpdateMemberRoleInput,
): Promise<
  ActionResult<{ id: number; organizationId: number; role: MemberRole }>
> {
  return withActionEvent(MembersActionOperation.updateMemberRole, () =>
    runAction(() => updateMemberRole(args)),
  );
}

export async function removeMemberAction(
  args: RemoveMemberInput,
): Promise<ActionResult<{ id: number; organizationId: number }>> {
  return withActionEvent(MembersActionOperation.removeMember, () =>
    runAction(() => removeMember(args)),
  );
}
