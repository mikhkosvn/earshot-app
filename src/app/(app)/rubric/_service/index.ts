import { queryOptions } from '@tanstack/react-query';

import { getRubricAction } from '@/server/rubric/actions';

export const RubricKey = {
  detail: 'rubric',
  save: 'rubric-save',
} as const;

export type RubricKey = (typeof RubricKey)[keyof typeof RubricKey];

export class RubricService {
  static readonly saveRubricMutationKey = [RubricKey.save];

  static getRubricQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [RubricKey.detail, projectId],
      queryFn: () => getRubricAction({ projectId }),
    });
  }
}
