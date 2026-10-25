import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function TelephonyPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Bring your own Telephony"
        description={
          "Control the global policy for external carrier numbers and manage the organization's telephony inventory."
        }
      />
    </SettingsPageContainer>
  );
}
