import { z } from 'zod';

import {
  BackgroundNoise,
  InterruptionLevel,
  Language,
  VoiceModel,
} from '@/generated/prisma/enums';
import { ALL_LANGUAGES } from '@/server/personalities/constants/personality-filters';
import {
  PACKET_LOSS_MAX,
  PACKET_LOSS_MIN,
  SOUND_VOLUME_MAX,
  SOUND_VOLUME_MIN,
  SPEED_MAX,
  SPEED_MIN,
  VOICE_VOLUME_MAX,
  VOICE_VOLUME_MIN,
} from '@/server/personalities/constants/personality-limits';

const idSchema = z.number().int().positive();

const optionalNumber = (message: string) =>
  z.number({ error: message }).min(0, 'Enter 0 or a larger number.').nullable();

const optionalInteger = (message: string) =>
  z
    .number({ error: message })
    .int('Enter a whole number.')
    .min(0, 'Enter 0 or a larger number.')
    .nullable();

export const personalityLanguageFilterSchema = z.union([
  z.enum(Language),
  z.literal(ALL_LANGUAGES),
]);

export const listPersonalitiesSchema = z.object({
  projectId: idSchema,
  language: personalityLanguageFilterSchema,
});

export const personalityIdSchema = z.object({ personalityId: idSchema });

export const personalityFormSchema = z
  .object({
    name: z.string().trim().min(1, 'Enter a personality name.').max(255),
    prompt: z.string().trim().min(1, 'Enter a personality prompt.'),
    voiceModel: z
      .enum(VoiceModel)
      .nullable()
      .refine((value) => value !== null, 'Select a voice model.'),
    voiceId: z.string().trim().min(1, 'Enter a voice ID.').max(255),
    voiceVolume: z
      .number({ error: 'Enter a volume.' })
      .min(VOICE_VOLUME_MIN, 'Use a value from 0.01 to 2.00.')
      .max(VOICE_VOLUME_MAX, 'Use a value from 0.01 to 2.00.'),
    interruptionLevel: z.enum(InterruptionLevel),
    language: z
      .enum(Language)
      .nullable()
      .refine((value) => value !== null, 'Select a language.'),
    speed: z
      .number({ error: 'Enter a speed.' })
      .min(SPEED_MIN, 'Use a value from 0.80 to 1.20.')
      .max(SPEED_MAX, 'Use a value from 0.80 to 1.20.'),
    backgroundNoise: z.enum(BackgroundNoise),
    backgroundNoiseUrl: z.string().trim(),
    backgroundSoundVolumeBase: z
      .number()
      .min(SOUND_VOLUME_MIN)
      .max(SOUND_VOLUME_MAX),
    backgroundSoundVolumeReduced: z
      .number()
      .min(SOUND_VOLUME_MIN)
      .max(SOUND_VOLUME_MAX),
    packetLossPercent: z
      .number({ error: 'Enter a percentage.' })
      .min(PACKET_LOSS_MIN, 'Use a value from 0 to 100.')
      .max(PACKET_LOSS_MAX, 'Use a value from 0 to 100.'),
    idleTimeoutSeconds: optionalInteger('Enter a number of seconds.'),
    idleMessageMaxSpokenCount: optionalInteger('Enter a number.'),
    startSpeakingWaitSeconds: optionalNumber('Enter a number of seconds.'),
    stopSpeakingNumWords: optionalInteger('Enter a number of words.'),
    stopSpeakingVoiceSeconds: optionalNumber('Enter a number of seconds.'),
    stopSpeakingBackoffSeconds: optionalNumber('Enter a number of seconds.'),
  })
  .superRefine((values, context) => {
    if (values.backgroundNoise !== BackgroundNoise.custom_url) return;
    if (z.url().safeParse(values.backgroundNoiseUrl).success) return;
    context.addIssue({
      code: 'custom',
      path: ['backgroundNoiseUrl'],
      message: 'Enter the URL of an audio file.',
    });
  });

export const createPersonalitySchema = z.object({
  projectId: idSchema,
  values: personalityFormSchema,
});

export const updatePersonalitySchema = z.object({
  personalityId: idSchema,
  values: personalityFormSchema,
});

export const forkPersonalitySchema = z.object({
  projectId: idSchema,
  personalityId: idSchema,
});

export const setPersonalityEnabledSchema = z.object({
  projectId: idSchema,
  personalityId: idSchema,
  enabled: z.boolean(),
});

export const setPersonalitiesEnabledSchema = z.object({
  projectId: idSchema,
  language: personalityLanguageFilterSchema,
  enabled: z.boolean(),
});
