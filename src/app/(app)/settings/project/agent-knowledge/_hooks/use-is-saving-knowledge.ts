'use client';

import { useIsMutating } from '@tanstack/react-query';

import { KnowledgeService } from '../_service';

export const useIsSavingKnowledge = () =>
  useIsMutating({ mutationKey: KnowledgeService.saveKnowledgeMutationKey }) > 0;
