'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { CreateScheduleDialog } from './create-schedule-dialog';

export function AddScheduleButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <PlusIcon />
        Add schedule
      </Button>
      <CreateScheduleDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
