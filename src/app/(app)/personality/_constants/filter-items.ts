import { Gender } from '@/generated/prisma/enums';
import { LanguageLabel } from '@/server/agents/constants/language-labels';
import {
  ALL_GENDERS,
  ALL_LANGUAGES,
  PERSONALITY_TYPE_FILTER_LABEL,
  PersonalityTypeFilter,
} from '@/server/personalities/constants/personality-filters';
import { GenderLabel } from '@/server/personalities/constants/gender-labels';

import { LANGUAGE_FILTER_VALUES } from './personality-list-params';

export const LANGUAGE_FILTER_ITEMS = LANGUAGE_FILTER_VALUES.map((value) => ({
  value,
  label: languageFilterLabel(value),
}));

function languageFilterLabel(value: (typeof LANGUAGE_FILTER_VALUES)[number]) {
  if (value === ALL_LANGUAGES) return 'All';
  return LanguageLabel[value];
}

export const GENDER_FILTER_ITEMS = [
  { value: ALL_GENDERS, label: 'All Genders' },
  ...Object.values(Gender).map((gender) => ({
    value: gender,
    label: GenderLabel[gender],
  })),
];

export const TYPE_FILTER_ITEMS = Object.values(PersonalityTypeFilter).map(
  (value) => ({ value, label: PERSONALITY_TYPE_FILTER_LABEL[value] }),
);
