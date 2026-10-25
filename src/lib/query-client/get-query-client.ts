import { environmentManager } from '@tanstack/react-query';
import { cache } from 'react';

import { getBrowserQueryClient } from './browser-query-client';
import { makeQueryClient } from './make-query-client';

const getServerQueryClient = cache(() => makeQueryClient());

const getQueryClient = () => {
  if (environmentManager.isServer()) return getServerQueryClient();
  return getBrowserQueryClient();
};

export default getQueryClient;
