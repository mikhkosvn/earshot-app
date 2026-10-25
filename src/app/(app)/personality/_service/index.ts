import { queryOptions } from '@tanstack/react-query';

import type { VoiceModel } from '@/generated/prisma/enums';
import { deferAction } from '@/lib/query-client/defer-action';
import {
  getPersonalityAction,
  listPersonalitiesAction,
} from '@/server/personalities/actions';
import type { PersonalityLanguageFilter } from '@/server/personalities/types';
import { listVoicesAction } from '@/server/voices/actions';

export const PersonalityKey = {
  list: 'personality-list',
  detail: 'personality-detail',
  voices: 'personality-voices',
  create: 'personality-create',
  update: 'personality-update',
  delete: 'personality-delete',
  fork: 'personality-fork',
  setEnabled: 'personality-set-enabled',
  setAllEnabled: 'personality-set-all-enabled',
  cloneVoice: 'personality-clone-voice',
} as const;

export type PersonalityKey =
  (typeof PersonalityKey)[keyof typeof PersonalityKey];

export class PersonalityService {
  static readonly listKey = [PersonalityKey.list];
  static readonly voicesKey = [PersonalityKey.voices];
  static readonly createMutationKey = [PersonalityKey.create];
  static readonly updateMutationKey = [PersonalityKey.update];
  static readonly deleteMutationKey = [PersonalityKey.delete];
  static readonly forkMutationKey = [PersonalityKey.fork];
  static readonly setEnabledMutationKey = [PersonalityKey.setEnabled];
  static readonly setAllEnabledMutationKey = [PersonalityKey.setAllEnabled];
  static readonly cloneVoiceMutationKey = [PersonalityKey.cloneVoice];

  static getListQuery(args: {
    projectId: number;
    language: PersonalityLanguageFilter;
  }) {
    return queryOptions({
      queryKey: [PersonalityKey.list, args],
      queryFn: () => deferAction(() => listPersonalitiesAction(args)),
    });
  }

  static getPersonalityQuery(args: { personalityId: number }) {
    return queryOptions({
      queryKey: [PersonalityKey.detail, args],
      queryFn: () => deferAction(() => getPersonalityAction(args)),
    });
  }

  static getVoicesQuery(args: { projectId: number; voiceModel: VoiceModel }) {
    return queryOptions({
      queryKey: [PersonalityKey.voices, args],
      queryFn: () => deferAction(() => listVoicesAction(args)),
    });
  }
}
