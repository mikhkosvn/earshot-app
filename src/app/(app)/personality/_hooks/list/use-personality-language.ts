'use client';

import { useQueryState } from 'nuqs';

import { personalityLanguageParser } from '../../_constants/personality-list-params';

export const usePersonalityLanguage = () =>
  useQueryState('language', personalityLanguageParser);
