import type { FilterOption } from '@/server/runs-overview/types';

export const matchesSearch = (option: FilterOption, search: string) =>
  option.label.toLowerCase().includes(search.trim().toLowerCase());
