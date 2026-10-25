import 'server-only';

import { createHash } from 'node:crypto';

export const hashApiKey = (plainKey: string) =>
  createHash('sha256').update(plainKey).digest('hex');
