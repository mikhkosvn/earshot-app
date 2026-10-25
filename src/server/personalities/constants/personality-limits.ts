export const VOICE_VOLUME_MIN = 0.01;
export const VOICE_VOLUME_MAX = 2;
export const SPEED_MIN = 0.8;
export const SPEED_MAX = 1.2;
export const PACKET_LOSS_MIN = 0;
export const PACKET_LOSS_MAX = 100;
export const SOUND_VOLUME_MIN = 0;
export const SOUND_VOLUME_MAX = 1;

export const PERSONALITY_DEFAULTS = {
  voiceVolume: 1,
  speed: 1,
  packetLossPercent: 0,
  backgroundSoundVolumeBase: 0.5,
  backgroundSoundVolumeReduced: 0.2,
  idleTimeoutSeconds: 10,
  idleMessageMaxSpokenCount: 3,
  startSpeakingWaitSeconds: 2.5,
  stopSpeakingNumWords: 1,
  stopSpeakingBackoffSeconds: 6,
};

export const SPEED_NORMAL = 1;
export const SPEED_SLOW_MAX = 0.95;
export const SPEED_FAST_MIN = 1.05;

export const FORK_TITLE_SUFFIX = ' - fork';
