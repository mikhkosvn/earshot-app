import 'server-only';

import { noop, type QueryClient } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';

export const prefetchEvaluatorOptions = (
  queryClient: QueryClient,
  projectId: number,
) => {
  const args = { projectId };
  void queryClient
    .query({ ...EvaluatorService.getAgentsQuery(args), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...EvaluatorService.getFoldersQuery(args), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...EvaluatorService.getTagsQuery(args), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...EvaluatorService.getPersonalitiesQuery(args), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...EvaluatorService.getMetricsQuery(args), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...EvaluatorService.getPhoneNumbersQuery(args), retry: false })
    .catch(noop);
};
