'use client';

import { useState } from 'react';

import { DeleteSelectedButton } from './delete-selected-button';
import { LabReviewTable } from './lab-review-table';
import { OverallScore } from './overall-score';

export function LabReviewSection() {
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <section aria-label="Lab rows" className="flex flex-col gap-3">
      <div className="flex min-h-9 items-center justify-between gap-3">
        <DeleteSelectedButton
          selected={selected}
          onDeleted={() => setSelected([])}
        />
        <OverallScore />
      </div>
      <LabReviewTable selected={selected} onSelectedChange={setSelected} />
    </section>
  );
}
