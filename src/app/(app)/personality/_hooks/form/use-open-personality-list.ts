'use client';

import { useRouter } from 'next/navigation';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Language } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

export const useOpenPersonalityList = () => {
  const router = useRouter();
  const projectId = useCurrentProjectId();

  return () =>
    router.push(
      UrlGenerator.personality({
        values: { project: projectId, language: Language.en },
      }),
    );
};
