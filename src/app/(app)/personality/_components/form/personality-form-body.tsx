'use client';

import { AdvancedSection } from './advanced/advanced-section';
import { ConversationSection } from './groups/conversation-section';
import { EnvironmentSection } from './groups/environment-section';
import { IdentitySection } from './groups/identity-section';
import { VoiceSection } from './voice/voice-section';

type PersonalityFormBodyProps = {
  advancedOpen: boolean;
};

export function PersonalityFormBody({
  advancedOpen,
}: PersonalityFormBodyProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-background">
      <IdentitySection />
      <VoiceSection />
      <ConversationSection />
      <EnvironmentSection />
      <AdvancedSection defaultOpen={advancedOpen} />
    </div>
  );
}
