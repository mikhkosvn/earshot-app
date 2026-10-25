'use client';

import { useSearchParam } from '@/components/common/search-input/use-search-param';

import { MEMBER_SEARCH_PARAM, filterMembers } from '../_utils/filter-members';
import { useMembers } from './use-members';

export const useFilteredMembers = () => {
  const members = useMembers();
  const { search } = useSearchParam(MEMBER_SEARCH_PARAM);
  return filterMembers(members, search);
};
