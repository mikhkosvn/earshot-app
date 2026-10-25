import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function ProviderApiKeysPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="API Settings"
        description={'Configure API keys for your project'}
      />
    </SettingsPageContainer>
  );
}
