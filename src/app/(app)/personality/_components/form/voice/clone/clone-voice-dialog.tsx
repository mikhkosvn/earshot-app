'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CloneVoiceForm } from './clone-voice-form';

interface CloneVoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloned: (voiceId: string) => void;
}

export function CloneVoiceDialog({
  open,
  onOpenChange,
  onCloned,
}: CloneVoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Clone a voice</DialogTitle>
          <DialogDescription>
            Upload a clean recording of one speaker, at least a few seconds
            long. Earshot stores the sample as a project voice. The new voice ID
            is filled in here once the sample is saved.
          </DialogDescription>
        </DialogHeader>
        <CloneVoiceForm
          key={String(open)}
          onCloned={(voiceId) => {
            onCloned(voiceId);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
