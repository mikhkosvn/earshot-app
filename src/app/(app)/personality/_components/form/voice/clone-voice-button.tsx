'use client';

import { MicIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { CloneVoiceDialog } from './clone/clone-voice-dialog';

export function CloneVoiceButton() {
  const { control, setValue } = useFormContext<PersonalityFormValues>();
  const voiceModel = useWatch({ control, name: 'voiceModel' });
  const [open, setOpen] = useState(false);
  if (!voiceModel) return null;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={() => setOpen(true)}
      >
        <MicIcon />
        Clone a voice
      </Button>
      <CloneVoiceDialog
        open={open}
        onOpenChange={setOpen}
        onCloned={(voiceId) =>
          setValue('voiceId', voiceId, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      />
    </>
  );
}
