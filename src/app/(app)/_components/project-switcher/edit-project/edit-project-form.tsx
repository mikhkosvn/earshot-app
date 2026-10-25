'use client';

import { FormProvider } from 'react-hook-form';

import { useEditProjectForm } from '@/app/(app)/_hooks/project-switcher/use-edit-project-form';
import { useIsUpdatingProject } from '@/app/(app)/_hooks/use-is-updating-project';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

import { ProjectNameField } from '../project-name-field';
import { EditProjectSubmitLabel } from './edit-project-submit-label';

type EditProjectFormProps = {
  onSaved: () => void;
};

export function EditProjectForm({ onSaved }: EditProjectFormProps) {
  const { form, onSubmit } = useEditProjectForm(onSaved);
  const isUpdating = useIsUpdatingProject();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        <div className="p-3">
          <ProjectNameField id="edit-project-name" />
        </div>
        <DialogFooter className="mx-0 mb-0 rounded-b-xl px-3 py-2.5">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <Button type="submit" size="sm" disabled={isUpdating}>
            <EditProjectSubmitLabel />
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
