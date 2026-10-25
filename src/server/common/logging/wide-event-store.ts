import 'server-only';

import { AsyncLocalStorage } from 'node:async_hooks';

import type { WideEvent } from './types';

export const wideEventStore = new AsyncLocalStorage<WideEvent>();
