'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

import { callListParsers } from '../../_constants/call-list-params';

const viewParsers = { view: callListParsers.view, page: parseAsInteger };

export const useCallViewParam = () => {
  const [{ view }, setValues] = useQueryStates(viewParsers);

  const setView = (viewId: number | null) =>
    setValues({ view: viewId, page: null });

  return { viewId: view, setView };
};
