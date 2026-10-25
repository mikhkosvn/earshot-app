import type { z } from 'zod';

import type { exportCallLogsSchema } from '@/server/call-exports/schemas';

export type ExportCallLogsInput = z.input<typeof exportCallLogsSchema>;
