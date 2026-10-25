import 'server-only';

import { prisma } from '@/lib/prisma';

export const isSignupOpen = async () => (await prisma.user.count()) === 0;
