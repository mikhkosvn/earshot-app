import type { QueryClient } from '@tanstack/react-query';

import { EvaluatorKey, EvaluatorService } from '@/app/(app)/test-case/_service';

export const invalidateEvaluatorData = (queryClient: QueryClient) =>
  Promise.all([
    queryClient.invalidateQueries({ queryKey: EvaluatorService.listKey }),
    queryClient.invalidateQueries({ queryKey: EvaluatorService.foldersKey }),
    queryClient.invalidateQueries({ queryKey: EvaluatorService.tagsKey }),
    queryClient.invalidateQueries({ queryKey: [EvaluatorKey.detail] }),
    queryClient.invalidateQueries({ queryKey: [EvaluatorKey.versions] }),
  ]);
