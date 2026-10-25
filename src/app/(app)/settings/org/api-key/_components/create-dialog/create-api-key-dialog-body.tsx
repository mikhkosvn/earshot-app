'use client';

import { useCreateApiKeyMutation } from '../../_hooks/mutations/use-create-api-key-mutation';
import { createdPlainKey } from '../../_utils/api-key-values';
import { CreateApiKeyForm } from './create-api-key-form';
import { CreatedApiKeyPanel } from './created-api-key-panel';

type CreateApiKeyDialogBodyProps = {
  onDone: () => void;
};

export function CreateApiKeyDialogBody({
  onDone,
}: CreateApiKeyDialogBodyProps) {
  const createApiKey = useCreateApiKeyMutation();
  const plainKey = createdPlainKey(createApiKey.data);

  if (plainKey)
    return <CreatedApiKeyPanel plainKey={plainKey} onDone={onDone} />;
  return <CreateApiKeyForm createApiKey={createApiKey} />;
}
