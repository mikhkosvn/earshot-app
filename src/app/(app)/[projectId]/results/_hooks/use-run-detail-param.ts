'use client';

import { useQueryState } from 'nuqs';

import { resultDetailParsers, RUN_DETAIL_PARAM } from '../_constants/result-params';

export const useRunDetailParam = () =>
  useQueryState(RUN_DETAIL_PARAM, resultDetailParsers[RUN_DETAIL_PARAM]);
