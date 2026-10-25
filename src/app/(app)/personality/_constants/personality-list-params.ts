import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { Gender, Language } from '@/generated/prisma/enums';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';
import {
  ALL_GENDERS,
  ALL_LANGUAGES,
  PersonalityTypeFilter,
} from '@/server/personalities/constants/personality-filters';

export const LANGUAGE_FILTER_VALUES = [
  ALL_LANGUAGES,
  ...Object.values(Language),
];

export const GENDER_FILTER_VALUES = [ALL_GENDERS, ...Object.values(Gender)];

export const personalityLanguageParser = parseAsStringLiteral(
  LANGUAGE_FILTER_VALUES,
).withDefault(Language.en);

export const personalityFilterParsers = {
  search: parseAsString.withDefault(''),
  gender: parseAsStringLiteral(GENDER_FILTER_VALUES).withDefault(ALL_GENDERS),
  type: parseAsStringLiteral(Object.values(PersonalityTypeFilter)).withDefault(
    PersonalityTypeFilter.all,
  ),
};

export const loadPersonalityListParams = createLoader({
  [PROJECT_QUERY_KEY]: parseAsInteger,
  language: personalityLanguageParser,
});
