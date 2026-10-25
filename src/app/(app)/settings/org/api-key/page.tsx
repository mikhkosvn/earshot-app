import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function ApiKeyPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="API Keys"
        description={'View your organization API keys'}
      />
    </SettingsPageContainer>
  );
}
