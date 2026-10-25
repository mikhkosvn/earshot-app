'use client';

import { useQueryStates } from 'nuqs';

import { resultFilterParsers } from '../_constants/result-params';

export const useResultFilterParams = () =>
  useQueryStates(resultFilterParsers);
