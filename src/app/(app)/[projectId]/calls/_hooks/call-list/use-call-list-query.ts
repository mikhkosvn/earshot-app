'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CallService } from '../../_service';
import { useCallListParams } from './use-call-list-params';
import { useCallListScope } from './use-call-list-scope';

export const useCallListQuery = () => {
  const scope = useCallListScope();
  const [{ page, pageSize }] = useCallListParams();
  return useSuspenseQuery(
    CallService.getListQuery({ ...scope, page, pageSize }),
  );
};
