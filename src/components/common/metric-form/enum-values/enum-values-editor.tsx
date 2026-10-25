'use client';

import { EnumView } from '../_constants/enum-view';
import { EnumJsonEditor } from './enum-json-editor';
import { EnumKeyList } from './enum-key-list';

interface EnumValuesEditorProps {
  view: EnumView;
}

export function EnumValuesEditor({ view }: EnumValuesEditorProps) {
  if (view === EnumView.json) return <EnumJsonEditor />;
  return <EnumKeyList />;
}
