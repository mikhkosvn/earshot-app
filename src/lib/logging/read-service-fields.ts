import { LOG_SERVICE_NAME } from './constants';
import type { LogFields } from './types';

export const readServiceFields = (): LogFields => ({
  service: LOG_SERVICE_NAME,
  version: process.env.NEXT_PUBLIC_APP_VERSION,
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
});
