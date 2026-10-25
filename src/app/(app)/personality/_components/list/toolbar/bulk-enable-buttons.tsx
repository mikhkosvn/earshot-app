'use client';

import { PowerIcon, PowerOffIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { useSetPersonalitiesEnabledMutation } from '../../../_hooks/mutations/list/use-set-personalities-enabled-mutation';
import { usePersonalityLanguage } from '../../../_hooks/list/use-personality-language';

export function BulkEnableButtons() {
  const projectId = useCurrentProjectId();
  const [language] = usePersonalityLanguage();
  const setAll = useSetPersonalitiesEnabledMutation();

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={setAll.isPending}
        onClick={() => setAll.mutate({ projectId, language, enabled: false })}
      >
        <PowerOffIcon />
        Disable All
      </Button>
      <Button
        type="button"
        size="sm"
        disabled={setAll.isPending}
        onClick={() => setAll.mutate({ projectId, language, enabled: true })}
      >
        <PowerIcon />
        Enable All
      </Button>
    </>
  );
}
