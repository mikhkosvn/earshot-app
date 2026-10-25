export const ALL_LANGUAGES = 'all' as const;

export type AllLanguages = typeof ALL_LANGUAGES;

export const PersonalityTypeFilter = {
  all: 'all',
  custom: 'custom',
  predefined: 'predefined',
} as const;

export type PersonalityTypeFilter =
  (typeof PersonalityTypeFilter)[keyof typeof PersonalityTypeFilter];

export const PERSONALITY_TYPE_FILTER_LABEL: Record<
  PersonalityTypeFilter,
  string
> = {
  [PersonalityTypeFilter.all]: 'All Types',
  [PersonalityTypeFilter.custom]: 'Custom',
  [PersonalityTypeFilter.predefined]: 'Predefined',
};

export const ALL_GENDERS = 'all' as const;

export type AllGenders = typeof ALL_GENDERS;
