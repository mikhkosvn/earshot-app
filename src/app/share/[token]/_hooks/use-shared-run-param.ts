'use client';

import { useQueryStates } from 'nuqs';

import { RUN_DETAIL_PARAM, shareParsers } from '../_constants/share-params';

const runParsers = { runId: shareParsers[RUN_DETAIL_PARAM] };

const runUrlKeys = { runId: RUN_DETAIL_PARAM };

export const useSharedRunParam = () => {
  const [{ runId }, setValues] = useQueryStates(runParsers, {
    urlKeys: runUrlKeys,
  });

  const openRun = (id: number) => setValues({ runId: id });
  const closeRun = () => setValues({ runId: null });

  return { runId, openRun, closeRun };
};
