'use client';

import { FormProvider } from 'react-hook-form';

import { useCreateProjectForm } from '@/app/(app)/_hooks/project-switcher/use-create-project-form';
import { useIsCreatingProject } from '@/app/(app)/_hooks/project-switcher/use-is-creating-project';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

import { ProjectNameField } from '../project-name-field';
import { CreateProjectSubmitLabel } from './create-project-submit-label';

interface CreateProjectFormProps {
  onCreated: () => void;
}

export function CreateProjectForm({ onCreated }: CreateProjectFormProps) {
  const { form, onSubmit } = useCreateProjectForm(onCreated);
  const isCreating = useIsCreatingProject();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        <div className="p-3">
          <ProjectNameField id="create-project-name" />
        </div>
        <DialogFooter className="mx-0 mb-0 rounded-b-xl px-3 py-2.5">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <Button type="submit" size="sm" disabled={isCreating}>
            <CreateProjectSubmitLabel />
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
