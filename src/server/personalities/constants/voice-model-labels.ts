import { VoiceModel } from '@/generated/prisma/enums';

export const VoiceModelLabel: Record<VoiceModel, string> = {
  [VoiceModel.eleven_multilingual_v2]: 'Eleven Multilingual V2',
  [VoiceModel.eleven_turbo_v2_5]: 'Eleven Turbo V2 5',
  [VoiceModel.eleven_flash_v2_5]: 'Eleven Flash V2 5',
  [VoiceModel.eleven_v3_conversational]: 'Eleven V3 Conversational',
  [VoiceModel.sonic_3_5]: 'Cartesia Sonic 3.5',
};
