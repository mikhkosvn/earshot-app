import type { TriggerType } from '@/lib/logging/constants';
import type { LogFields, LogFieldValue } from '@/lib/logging/types';

import type { EventKind, ExternalService, TraceHeader } from './constants';

export type WideEvent = LogFields;

export type ErrorFields = {
  type: string;
  message: string;
  code?: string;
  status_code?: number;
  service?: ExternalService;
  operation?: string;
  service_request_id?: string;
  response?: LogFieldValue;
  attempt?: number;
  retriable?: boolean;
  cause?: ErrorFields;
};

export type ExternalCallFields = {
  service: ExternalService;
  operation: string;
  attempt?: number;
  status_code?: number;
  duration_ms?: number;
};

export interface EventStart {
  kind: EventKind;
  operation: string;
  trigger?: TriggerType;
  fields?: LogFields;
  newTrace?: boolean;
  quietWhenSkipped?: boolean;
}

export type TraceContext = Partial<Record<TraceHeader, string>>;
