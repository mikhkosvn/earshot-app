import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function ThirdPartyNoticesPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Third-Party Notices"
        description={
          'Open source packages and their licenses used in this project'
        }
      />
    </SettingsPageContainer>
  );
}
