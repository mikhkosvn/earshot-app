import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  clearSessionCookie,
  readSessionCookie,
} from '@/server/auth/utils/session-cookie';
import { hashSessionToken } from '@/server/auth/utils/session-token';

export const signOut = async () => {
  const token = await readSessionCookie();
  if (token) {
    const deleted = await prisma.session.deleteMany({
      where: { id: hashSessionToken(token) },
    });
    addEventFields({ session: { deleted_count: deleted.count } });
  }
  await clearSessionCookie();
  return { signedOut: true };
};
