'use client';

import { useQueryStates } from 'nuqs';

import { resultsListParsers } from '../../_constants/result-params';

export const useResultsListParams = () => useQueryStates(resultsListParsers);
