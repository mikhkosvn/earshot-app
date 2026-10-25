import type { QueryClient } from '@tanstack/react-query';

import { ResultService } from '../../_service';

export const invalidateRunQueries = (queryClient: QueryClient) =>
  Promise.all([
    queryClient.invalidateQueries({ queryKey: ResultService.runKey }),
    queryClient.invalidateQueries({ queryKey: ResultService.runsKey }),
    queryClient.invalidateQueries({ queryKey: ResultService.detailKey }),
    queryClient.invalidateQueries({ queryKey: ResultService.statusKey }),
  ]);

export const invalidateRunAndListQueries = (queryClient: QueryClient) =>
  Promise.all([
    invalidateRunQueries(queryClient),
    queryClient.invalidateQueries({ queryKey: ResultService.listKey }),
  ]);
