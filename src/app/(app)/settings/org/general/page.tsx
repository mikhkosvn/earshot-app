import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function OrganizationGeneralPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Organization Settings"
        description={'Manage your organization details and preferences'}
      />
    </SettingsPageContainer>
  );
}
