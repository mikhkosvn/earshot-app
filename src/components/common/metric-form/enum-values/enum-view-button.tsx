'use client';

import { CodeXmlIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { EnumView } from '../_constants/enum-view';
import { EnumViewLabel } from './enum-view-label';

type EnumViewButtonProps = {
  view: EnumView;
  onViewChange: (view: EnumView) => void;
};

const nextView = (view: EnumView) => {
  if (view === EnumView.json) return EnumView.list;
  return EnumView.json;
};

export function EnumViewButton({ view, onViewChange }: EnumViewButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => onViewChange(nextView(view))}
    >
      <CodeXmlIcon />
      <EnumViewLabel view={view} />
    </Button>
  );
}
