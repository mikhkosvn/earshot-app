import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function ProjectNotificationsPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Notifications"
        description={
          'Connect your tools and configure notification preferences'
        }
      />
    </SettingsPageContainer>
  );
}
