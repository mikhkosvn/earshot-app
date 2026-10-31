import { z } from 'zod';

export const vapiCallSchema = z.looseObject({
  id: z.string(),
  startedAt: z.string().nullish(),
  endedAt: z.string().nullish(),
  customer: z.looseObject({ number: z.string().nullish() }).nullish(),
  artifact: z.unknown().optional(),
});

export const vapiCallListSchema = z.array(vapiCallSchema);

export type VapiCall = z.output<typeof vapiCallSchema>;
