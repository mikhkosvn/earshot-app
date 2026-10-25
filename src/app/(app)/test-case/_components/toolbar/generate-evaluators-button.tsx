'use client';

import { BotIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { GenerateEvaluatorsDialog } from '../generate/generate-evaluators-dialog';
import { GenerateEvaluatorsLabel } from './generate-evaluators-label';

export function GenerateEvaluatorsButton() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button type="button" size="sm" onClick={() => setOpen(true)}>
        <BotIcon />
        <GenerateEvaluatorsLabel />
      </Button>
      <GenerateEvaluatorsDialog open={isOpen} onOpenChange={setOpen} />
    </>
  );
}
