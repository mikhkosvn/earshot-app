'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Switch } from '@/components/ui/switch';
import type { PersonalityListItem } from '@/server/personalities/types';

import { useSetPersonalityEnabledMutation } from '../../../_hooks/mutations/list/use-set-personality-enabled-mutation';

type EnabledSwitchProps = {
  item: PersonalityListItem;
};

export function EnabledSwitch({ item }: EnabledSwitchProps) {
  const projectId = useCurrentProjectId();
  const setEnabled = useSetPersonalityEnabledMutation();

  return (
    <Switch
      aria-label={`Enable ${item.name}`}
      checked={item.enabled}
      disabled={setEnabled.isPending}
      onCheckedChange={(enabled) =>
        setEnabled.mutate({ projectId, personalityId: item.id, enabled })
      }
    />
  );
}
