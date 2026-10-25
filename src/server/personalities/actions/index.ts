'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createPersonality } from '@/server/personalities/create-personality';
import { deletePersonality } from '@/server/personalities/delete-personality';
import { forkPersonality } from '@/server/personalities/fork-personality';
import { getPersonality } from '@/server/personalities/get-personality';
import { listPersonalities } from '@/server/personalities/list-personalities';
import { setPersonalitiesEnabled } from '@/server/personalities/set-personalities-enabled';
import { setPersonalityEnabled } from '@/server/personalities/set-personality-enabled';
import type {
  CreatePersonalityInput,
  ForkPersonalityInput,
  ListPersonalitiesInput,
  PersonalityDetail,
  PersonalityIdInput,
  PersonalityListItem,
  PersonalityRef,
  SetPersonalitiesEnabledInput,
  SetPersonalityEnabledInput,
  UpdatePersonalityInput,
} from '@/server/personalities/types';
import { updatePersonality } from '@/server/personalities/update-personality';

export async function listPersonalitiesAction(
  args: ListPersonalitiesInput,
): Promise<PersonalityListItem[]> {
  return listPersonalities(args);
}

export async function getPersonalityAction(
  args: PersonalityIdInput,
): Promise<PersonalityDetail> {
  return getPersonality(args);
}

export async function createPersonalityAction(
  args: CreatePersonalityInput,
): Promise<ActionResult<PersonalityRef>> {
  return runAction(() => createPersonality(args));
}

export async function updatePersonalityAction(
  args: UpdatePersonalityInput,
): Promise<ActionResult<PersonalityRef>> {
  return runAction(() => updatePersonality(args));
}

export async function deletePersonalityAction(
  args: PersonalityIdInput,
): Promise<ActionResult<PersonalityRef>> {
  return runAction(() => deletePersonality(args));
}

export async function forkPersonalityAction(
  args: ForkPersonalityInput,
): Promise<ActionResult<PersonalityRef>> {
  return runAction(() => forkPersonality(args));
}

export async function setPersonalityEnabledAction(
  args: SetPersonalityEnabledInput,
): Promise<ActionResult<{ id: number; enabled: boolean }>> {
  return runAction(() => setPersonalityEnabled(args));
}

export async function setPersonalitiesEnabledAction(
  args: SetPersonalitiesEnabledInput,
): Promise<ActionResult<{ count: number }>> {
  return runAction(() => setPersonalitiesEnabled(args));
}
