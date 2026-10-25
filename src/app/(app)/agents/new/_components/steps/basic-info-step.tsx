'use client';

import { Button } from '@/components/ui/button';

import { AgentDescriptionField } from '../../../_components/basics/agent-description-field';
import { AgentLanguageField } from '../../../_components/basics/agent-language-field';
import { AgentNameField } from '../../../_components/basics/agent-name-field';
import { ShortDescriptionWarning } from '../../../_components/basics/short-description-warning';
import { useIsCreatingAgent } from '../../_hooks/use-is-creating-agent';
import { CreateAgentSubmitLabel } from './create-agent-submit-label';

interface BasicInfoStepProps {
  onBack: () => void;
}

export function BasicInfoStep({ onBack }: BasicInfoStepProps) {
  const isCreating = useIsCreatingAgent();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 p-4">
        <AgentNameField />
        <AgentLanguageField />
        <AgentDescriptionField />
        <ShortDescriptionWarning />
      </div>
      <div className="flex justify-end gap-2 border-t px-4 py-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isCreating}>
          <CreateAgentSubmitLabel />
        </Button>
      </div>
    </div>
  );
}
