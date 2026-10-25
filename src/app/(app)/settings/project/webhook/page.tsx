import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function WebhookSettingsPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Webhook Settings"
        description={'Configure webhook endpoints for your project.'}
      />
    </SettingsPageContainer>
  );
}
