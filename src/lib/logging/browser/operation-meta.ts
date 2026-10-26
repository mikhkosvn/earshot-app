import type { TriggerType } from '../constants';
import type { LogFields } from '../types';

export interface OperationMeta extends Record<string, unknown> {
  trigger?: TriggerType;
  triggerSource?: string;
  parentOperationId?: string;
  fields?: LogFields;
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: OperationMeta;
    queryMeta: OperationMeta;
  }
}
