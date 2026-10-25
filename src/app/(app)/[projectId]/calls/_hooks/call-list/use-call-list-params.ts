'use client';

import { useQueryStates } from 'nuqs';

import { callListParsers } from '../../_constants/call-list-params';

export const useCallListParams = () => useQueryStates(callListParsers);
