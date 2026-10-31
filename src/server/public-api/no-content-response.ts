import 'server-only';

import { STATUS_CODE_NO_CONTENT } from '@/server/public-api/constants';

export const noContentResponse = () =>
  new Response(null, { status: STATUS_CODE_NO_CONTENT });
