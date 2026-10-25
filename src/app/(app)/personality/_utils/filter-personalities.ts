import {
  ALL_GENDERS,
  PersonalityTypeFilter,
} from '@/server/personalities/constants/personality-filters';
import type { PersonalityListItem } from '@/server/personalities/types';

type PersonalityFilters = {
  search: string;
  gender: string;
  type: PersonalityTypeFilter;
};

const matchesType = (
  item: PersonalityListItem,
  type: PersonalityTypeFilter,
) => {
  if (type === PersonalityTypeFilter.custom) return !item.isGlobal;
  if (type === PersonalityTypeFilter.predefined) return item.isGlobal;
  return true;
};

export const filterPersonalities = (
  items: PersonalityListItem[],
  { search, gender, type }: PersonalityFilters,
) => {
  const query = search.trim().toLowerCase();
  return items.filter(
    (item) =>
      (gender === ALL_GENDERS || item.gender === gender) &&
      matchesType(item, type) &&
      (!query || item.name.toLowerCase().includes(query)),
  );
};
