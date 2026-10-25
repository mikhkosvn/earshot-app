'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

import { PendingLabel } from '../../../../_components/pending-label';
import { useAddConnectorForm } from '../../../_hooks/use-add-connector-form';
import { ConnectorBasicsFields } from './connector-basics-fields';
import { ConnectorSourceFields } from './connector-source-fields';

interface AddConnectorFormProps {
  onCreated: () => void;
}

export function AddConnectorForm({ onCreated }: AddConnectorFormProps) {
  const { form, onSubmit, isPending } = useAddConnectorForm(onCreated);

  return (
    <FormProvider {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.stopPropagation();
          void onSubmit(event);
        }}
      >
        <ConnectorBasicsFields />
        <ConnectorSourceFields />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            <PendingLabel pending={isPending} pendingText="Creating...">
              Create Connector
            </PendingLabel>
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
