'use client';

import { Button } from '@/components/ui/button';

import { useIsUploadingCalls } from '../../_hooks/mutations/call-ingest/use-is-uploading-calls';
import { AddCallSubmitLabel } from './add-call-submit-label';

export function AddCallSubmitButton() {
  const isUploading = useIsUploadingCalls();

  return (
    <Button type="submit" size="sm" disabled={isUploading}>
      <AddCallSubmitLabel />
    </Button>
  );
}
