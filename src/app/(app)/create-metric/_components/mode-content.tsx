'use client';

import { CreateMode } from '../_constants/create-mode';
import { DetailModeForm } from './detail/detail-mode-form';
import { QuickModeCard } from './quick/quick-mode-card';

type ModeContentProps = {
  mode: CreateMode;
  onModeChange: (mode: CreateMode) => void;
};

export function ModeContent({ mode, onModeChange }: ModeContentProps) {
  if (mode === CreateMode.detail) return <DetailModeForm />;
  return <QuickModeCard onSkip={() => onModeChange(CreateMode.detail)} />;
}
