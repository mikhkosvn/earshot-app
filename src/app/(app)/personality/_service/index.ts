import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  getPersonalityAction,
  listPersonalitiesAction,
} from '@/server/personalities/actions';
import type { PersonalityLanguageFilter } from '@/server/personalities/types';

export const PersonalityKey = {
  list: 'personality-list',
  detail: 'personality-detail',
  create: 'personality-create',
  update: 'personality-update',
  delete: 'personality-delete',
  fork: 'personality-fork',
  setEnabled: 'personality-set-enabled',
  setAllEnabled: 'personality-set-all-enabled',
} as const;

export type PersonalityKey =
  (typeof PersonalityKey)[keyof typeof PersonalityKey];

export class PersonalityService {
  static readonly listKey = [PersonalityKey.list];
  static readonly createMutationKey = [PersonalityKey.create];
  static readonly updateMutationKey = [PersonalityKey.update];
  static readonly deleteMutationKey = [PersonalityKey.delete];
  static readonly forkMutationKey = [PersonalityKey.fork];
  static readonly setEnabledMutationKey = [PersonalityKey.setEnabled];
  static readonly setAllEnabledMutationKey = [PersonalityKey.setAllEnabled];

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
}
