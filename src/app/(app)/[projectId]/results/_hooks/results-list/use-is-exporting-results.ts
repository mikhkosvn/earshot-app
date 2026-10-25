'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ResultService } from '../../_service';

export const useIsExportingResults = () =>
  useIsMutating({ mutationKey: ResultService.exportResultsMutationKey }) > 0;
