'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

const readOrigin = () => window.location.origin;

const readServerOrigin = () => '';

export const useAppOrigin = () =>
  useSyncExternalStore(subscribe, readOrigin, readServerOrigin);
