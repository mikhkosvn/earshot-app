import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function AgentKnowledgePage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Agent knowledge"
        description={
          'What every improvement run in this project must know before it proposes a change — wording you have to keep, an escalation path, a tone. Saved as a new version each time, so you can read back what changed.'
        }
      />
    </SettingsPageContainer>
  );
}
