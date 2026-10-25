'use client';

import { FilterIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { FiltersDialog } from '../filters/filters-dialog';
import { FiltersButtonLabel } from './filters-button-label';

export function FiltersButton() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <FilterIcon />
        <FiltersButtonLabel />
      </Button>
      <FiltersDialog open={isOpen} onOpenChange={setOpen} />
    </>
  );
}
