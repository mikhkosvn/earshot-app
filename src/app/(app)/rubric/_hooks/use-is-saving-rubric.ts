'use client';

import { useIsMutating } from '@tanstack/react-query';

import { RubricService } from '../_service';

export const useIsSavingRubric = () =>
  useIsMutating({ mutationKey: RubricService.saveRubricMutationKey }) > 0;
