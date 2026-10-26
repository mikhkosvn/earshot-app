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
import { VoicesActionOperation } from '@/server/voices/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listVoicesAction(
  args: ListVoicesInput,
): Promise<VoiceCatalog> {
  return withActionEvent(VoicesActionOperation.listVoices, () =>
    listVoices(args),
  );
}

export async function cloneVoiceAction(
  args: CloneVoiceInput,
): Promise<ActionResult<ClonedVoiceResult>> {
  return withActionEvent(VoicesActionOperation.cloneVoice, () =>
    runAction(() => cloneVoice(args)),
  );
}
