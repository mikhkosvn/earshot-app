'use client';

import { useIsMutating } from '@tanstack/react-query';

import { CallService } from '../../../_service';

export const useIsUploadingCalls = () =>
  useIsMutating({ mutationKey: CallService.uploadMutationKey }) > 0;
