export const MembersActionOperation = {
  listMembers: 'members.list_members',
  updateMemberRole: 'members.update_member_role',
  removeMember: 'members.remove_member',
} as const;

export type MembersActionOperation =
  (typeof MembersActionOperation)[keyof typeof MembersActionOperation];
