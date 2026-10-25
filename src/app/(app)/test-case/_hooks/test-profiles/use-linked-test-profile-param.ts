'use client';

import { useQueryState } from 'nuqs';

import { TEST_PROFILE_QUERY_KEY } from '@/lib/url-generator/constants';
import { evaluatorsParser } from '@/lib/url-generator/parsers';

export const useLinkedTestProfileParam = () =>
  useQueryState(
    TEST_PROFILE_QUERY_KEY,
    evaluatorsParser[TEST_PROFILE_QUERY_KEY],
  );
