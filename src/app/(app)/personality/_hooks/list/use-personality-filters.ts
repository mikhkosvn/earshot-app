'use client';

import { useQueryStates } from 'nuqs';

import { personalityFilterParsers } from '../../_constants/personality-list-params';

export const usePersonalityFilters = () =>
  useQueryStates(personalityFilterParsers);
