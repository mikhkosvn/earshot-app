import { environmentManager } from '@tanstack/react-query';

import { getBrowserQueryClient } from './browser-query-client';
import { makeQueryClient } from './make-query-client';

const getQueryClient = () => {
  if (environmentManager.isServer()) return makeQueryClient();
  return getBrowserQueryClient();
};

export default getQueryClient;
