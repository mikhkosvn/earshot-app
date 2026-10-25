import { z } from 'zod';

import { VoiceModel } from '@/generated/prisma/enums';
import {
  CLONE_SAMPLE_EXTENSIONS,
  CLONE_SAMPLE_MAX_BYTES,
} from '@/server/voices/constants/elevenlabs-voices';

const idSchema = z.number().int().positive();

export const listVoicesSchema = z.object({
  projectId: idSchema,
  voiceModel: z.enum(VoiceModel),
});

const hasAudioExtension = (fileName: string) =>
  CLONE_SAMPLE_EXTENSIONS.some((extension) =>
    fileName.toLowerCase().endsWith(extension),
  );

export const cloneVoiceFormSchema = z.object({
  name: z.string().trim().min(1, 'Enter a voice name.').max(255),
  sample: z
    .instanceof(File, { message: 'Choose an audio file.' })
    .nullable()
    .refine((file) => file !== null, 'Choose an audio file.')
    .refine(
      (file) => file === null || hasAudioExtension(file.name),
      'Use a wav, mp3, m4a, ogg, webm, or flac file.',
    )
    .refine(
      (file) => file === null || file.size <= CLONE_SAMPLE_MAX_BYTES,
      'The file must be 25MB or smaller.',
    ),
});

export const cloneVoiceSchema = cloneVoiceFormSchema.extend({
  projectId: idSchema,
});
