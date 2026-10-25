'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PendingLabel } from '../../../../_components/pending-label';
import {
  isVariableEditorMode,
  VARIABLE_EDITOR_MODE_LABEL,
  VariableEditorMode,
} from '../../../_constants/variable-editor-mode';
import { useAddVariablesForm } from '../../../_hooks/use-add-variables-form';
import { VariablesEditor } from './variables-editor';

interface AddVariablesFormProps {
  onSaved: () => void;
}

export function AddVariablesForm({ onSaved }: AddVariablesFormProps) {
  const editor = useAddVariablesForm(onSaved);

  return (
    <FormProvider {...editor.form}>
      <form
        noValidate
        className="flex flex-col gap-3"
        onSubmit={editor.onSubmit}
      >
        <Tabs
          value={editor.mode}
          onValueChange={(value) => {
            if (!isVariableEditorMode(value)) return;
            editor.changeMode(value);
          }}
        >
          <TabsList>
            {Object.values(VariableEditorMode).map((mode) => (
              <TabsTrigger key={mode} value={mode}>
                {VARIABLE_EDITOR_MODE_LABEL[mode]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <VariablesEditor editor={editor} />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" disabled={editor.isPending}>
            <PendingLabel pending={editor.isPending} pendingText="Saving...">
              Save Variables
            </PendingLabel>
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
