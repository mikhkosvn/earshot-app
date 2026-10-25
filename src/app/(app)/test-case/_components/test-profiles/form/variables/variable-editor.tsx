'use client';

import {
  VariableEditorMode,
  type VariableListName,
} from '../../../../_constants/variable-editor-mode';
import { VariableJsonEditor } from './variable-json-editor';
import { VariableTableEditor } from './variable-table-editor';

type VariableEditorProps = {
  name: VariableListName;
  mode: VariableEditorMode;
};

export function VariableEditor({ name, mode }: VariableEditorProps) {
  if (mode === VariableEditorMode.json)
    return <VariableJsonEditor name={name} />;
  return <VariableTableEditor name={name} />;
}
