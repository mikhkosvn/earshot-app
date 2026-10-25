'use client';

import { CreateMode } from '../_constants/create-mode';
import { AiModePanel } from './ai-mode/ai-mode-panel';
import { ManualModeWizard } from './manual-mode/manual-mode-wizard';
import { TranscriptModePanel } from './transcript-mode/transcript-mode-panel';

type CreateModeContentProps = {
  mode: CreateMode;
};

export function CreateModeContent({ mode }: CreateModeContentProps) {
  if (mode === CreateMode.manual) return <ManualModeWizard />;
  if (mode === CreateMode.transcript) return <TranscriptModePanel />;
  return <AiModePanel />;
}
