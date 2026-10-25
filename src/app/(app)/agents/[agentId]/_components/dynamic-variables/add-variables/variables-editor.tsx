'use client';

import type { useAddVariablesForm } from '../../../_hooks/use-add-variables-form';
import { VariableEditorMode } from '../../../_constants/variable-editor-mode';
import { VariableRowsEditor } from './variable-rows-editor';
import { VariablesJsonEditor } from './variables-json-editor';

type VariablesEditorProps = {
  editor: ReturnType<typeof useAddVariablesForm>;
};

export function VariablesEditor({ editor }: VariablesEditorProps) {
  if (editor.mode === VariableEditorMode.json) {
    return (
      <VariablesJsonEditor
        value={editor.jsonText}
        error={editor.jsonError}
        onChange={editor.setJsonText}
      />
    );
  }
  return <VariableRowsEditor rows={editor.rows} />;
}
