import { AgentDescriptionField } from '../../_components/basics/agent-description-field';
import { AgentLanguageField } from '../../_components/basics/agent-language-field';
import { AgentNameField } from '../../_components/basics/agent-name-field';
import { ShortDescriptionWarning } from '../../_components/basics/short-description-warning';

export function BasicsCard() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-background p-3">
      <AgentNameField />
      <AgentLanguageField />
      <AgentDescriptionField />
      <ShortDescriptionWarning />
    </div>
  );
}
