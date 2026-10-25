import { TranscriptRole } from '@/server/call-engine/constants';

export const TRANSCRIPT_EXAMPLE = [
  {
    role: TranscriptRole.main_agent,
    content:
      'Thank you for calling Bright Smile Dental. How can I help you today?',
    startTime: 0,
  },
  {
    role: TranscriptRole.testing_agent,
    content: 'Hi, I need to move my cleaning appointment to next week.',
    startTime: 4,
  },
  {
    role: TranscriptRole.main_agent,
    content: 'Sure. Can I have your full name and date of birth, please?',
    startTime: 8,
  },
  {
    role: TranscriptRole.testing_agent,
    content: 'Sarah Mitchell, June 15, 1988.',
    startTime: 13,
  },
  {
    role: TranscriptRole.main_agent,
    content:
      'Thank you, Sarah. I have Tuesday at 9 AM or Thursday at 2 PM. Which works for you?',
    startTime: 17,
  },
  {
    role: TranscriptRole.testing_agent,
    content: 'Thursday at 2 PM, please.',
    startTime: 24,
  },
  {
    role: TranscriptRole.main_agent,
    content:
      'Done. Your appointment is now Thursday at 2 PM. Is there anything else?',
    startTime: 27,
  },
];

export const EMPTY_TRANSCRIPT = [
  { role: TranscriptRole.main_agent, content: '', startTime: null },
  { role: TranscriptRole.testing_agent, content: '', startTime: null },
];

export const TranscriptSpeakerLabel: Record<TranscriptRole, string> = {
  [TranscriptRole.main_agent]: 'Main Agent',
  [TranscriptRole.testing_agent]: 'Caller',
};

export const TranscriptPlaceholder: Record<TranscriptRole, string> = {
  [TranscriptRole.main_agent]: 'What did the agent say?',
  [TranscriptRole.testing_agent]: 'What did the caller say?',
};
