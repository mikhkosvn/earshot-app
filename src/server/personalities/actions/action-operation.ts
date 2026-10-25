export const PersonalitiesActionOperation = {
  listPersonalities: 'personalities.list_personalities',
  getPersonality: 'personalities.get_personality',
  createPersonality: 'personalities.create_personality',
  updatePersonality: 'personalities.update_personality',
  deletePersonality: 'personalities.delete_personality',
  forkPersonality: 'personalities.fork_personality',
  setPersonalityEnabled: 'personalities.set_personality_enabled',
  setPersonalitiesEnabled: 'personalities.set_personalities_enabled',
} as const;

export type PersonalitiesActionOperation =
  (typeof PersonalitiesActionOperation)[keyof typeof PersonalitiesActionOperation];
