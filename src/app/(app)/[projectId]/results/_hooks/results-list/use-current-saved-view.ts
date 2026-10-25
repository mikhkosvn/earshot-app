'use client';

import { matchSavedView } from '../../_utils/results-list/saved-views-query';
import { useResultFilterParams } from '../use-result-filter-params';
import { useSavedViewsQuery } from './use-saved-views-query';

export const useCurrentSavedView = () => {
  const [{ agent }] = useResultFilterParams();
  const { data: views = [] } = useSavedViewsQuery();
  return matchSavedView(views, agent);
};
