import 'server-only';

import { randomInt } from 'node:crypto';

import {
  TESTING_NUMBER_DIGITS,
  TESTING_NUMBER_PREFIX,
} from '@/server/runs/constants/run-limits';

export const generateTestingNumber = () =>
  `${TESTING_NUMBER_PREFIX}${String(randomInt(10 ** TESTING_NUMBER_DIGITS)).padStart(TESTING_NUMBER_DIGITS, '0')}`;
