import type { MemberRow } from '@/server/members/types';

export const MEMBER_SEARCH_PARAM = 'search';

export const filterMembers = (members: MemberRow[], search: string) => {
  const query = search.trim().toLowerCase();
  if (!query) return members;
  return members.filter(
    (member) =>
      member.name.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query),
  );
};

export const memberInitial = (member: MemberRow) =>
  (member.name || member.email).charAt(0).toUpperCase();
