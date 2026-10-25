import type { z } from 'zod';

import type { Gender } from '@/generated/prisma/enums';
import type {
  cloneVoiceFormSchema,
  cloneVoiceSchema,
  listVoicesSchema,
} from '@/server/voices/schemas';

export type ListVoicesInput = z.input<typeof listVoicesSchema>;
export type CloneVoiceFormValues = z.input<typeof cloneVoiceFormSchema>;
export type CloneVoiceInput = z.input<typeof cloneVoiceSchema>;

export interface VoiceOption {
  id: string;
  label: string;
  gender: Gender | null;
  accent: string | null;
  sampleFileId: string | null;
}

export interface VoiceCatalog {
  catalog: VoiceOption[];
  cloned: VoiceOption[];
}

export interface ClonedVoiceResult {
  id: string;
  name: string;
}
