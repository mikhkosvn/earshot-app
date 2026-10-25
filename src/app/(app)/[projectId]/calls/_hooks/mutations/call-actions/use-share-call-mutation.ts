'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { ShareLinkTarget } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { createShareLinkAction } from '@/server/share-links/actions';

import { CallService } from '../../../_service';

const copyLink = async (token: string) => {
  const url = `${window.location.origin}${UrlGenerator.share({ token })}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    toast.info(url);
    return;
  }
  toast.success('The share link is copied.');
};

export const useShareCallMutation = () => {
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: CallService.shareMutationKey,
    mutationFn: (callLogId: number) =>
      createShareLinkAction({
        projectId,
        target: ShareLinkTarget.call_log,
        targetId: callLogId,
      }),
    onSuccess: async (result) => {
      if (!result.ok) return;
      await copyLink(result.data.token);
    },
  });
};
