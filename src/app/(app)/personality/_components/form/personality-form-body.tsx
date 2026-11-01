'use client';

import { IdentitySection } from './groups/identity-section';
import { VoiceLanguageSection } from './groups/voice-language-section';

export function PersonalityFormBody() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-background">
      <IdentitySection />
      <VoiceLanguageSection />
    </div>
  );
}
