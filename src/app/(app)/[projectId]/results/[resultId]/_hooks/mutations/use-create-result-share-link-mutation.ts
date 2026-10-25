'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { ShareLinkTarget } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { createShareLinkAction } from '@/server/share-links/actions';

import { useResultId } from '../../../_hooks/use-result-id';
import { ResultService } from '../../../_service';

const copyShareLink = async (token: string) => {
  const url = `${window.location.origin}${UrlGenerator.share({ token })}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    toast.info('Copy the share link.', { description: url });
    return;
  }
  toast.success('The share link is copied.', { description: url });
};

export const useCreateResultShareLinkMutation = () => {
  const projectId = useCurrentProjectId();
  const resultId = useResultId();

  return useMutation({
    mutationKey: ResultService.createShareLinkMutationKey,
    mutationFn: () =>
      createShareLinkAction({
        projectId,
        target: ShareLinkTarget.result,
        targetId: resultId,
      }),
    onSuccess: async (result) => {
      if (!result.ok) return;
      await copyShareLink(result.data.token);
    },
  });
};
