'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { cloneVoice } from '@/server/voices/clone-voice';
import { listVoices } from '@/server/voices/list-voices';
import type {
  ClonedVoiceResult,
  CloneVoiceInput,
  ListVoicesInput,
  VoiceCatalog,
} from '@/server/voices/types';

export async function listVoicesAction(
  args: ListVoicesInput,
): Promise<VoiceCatalog> {
  return listVoices(args);
}

export async function cloneVoiceAction(
  args: CloneVoiceInput,
): Promise<ActionResult<ClonedVoiceResult>> {
  return runAction(() => cloneVoice(args));
}
