import 'server-only';

import { MetricEvalType } from '@/generated/prisma/enums';
import type { GeneratedMetricDraft } from '@/server/metrics/types';

interface DraftSeed {
  name: string;
  purpose: string;
  success: string[];
  failure: string[];
}

const APPOINTMENT_PATTERN = /appoint|book|schedul|reserv/i;

const APPOINTMENT_SEEDS: DraftSeed[] = [
  {
    name: 'new_appointment_booking',
    purpose:
      'whether the main agent successfully books a new appointment when the testing agent requests one',
    success: [
      'The main agent collects the date, the time, and the reason for the visit.',
      'The main agent confirms the booked slot back to the testing agent.',
    ],
    failure: [
      'The main agent ends the call without a booked slot.',
      'The main agent books a slot that the testing agent did not accept.',
    ],
  },
  {
    name: 'identity_verification_before_moving_appointment',
    purpose:
      'whether the main agent verifies the identity of the testing agent before it moves an existing appointment',
    success: [
      'The main agent asks for the name and one more identifier before any change.',
    ],
    failure: [
      'The main agent moves the appointment before it verifies the caller.',
    ],
  },
  {
    name: 'appointment_move_completion',
    purpose:
      'whether the main agent completes a requested appointment move to a new slot',
    success: [
      'The main agent offers available slots and confirms the new slot.',
    ],
    failure: [
      'The main agent leaves the appointment at the old slot without a reason.',
    ],
  },
  {
    name: 'identity_verification_before_canceling_appointment',
    purpose:
      'whether the main agent verifies the identity of the testing agent before it cancels an appointment',
    success: ['The main agent verifies the caller before the cancellation.'],
    failure: ['The main agent cancels the appointment without a verification.'],
  },
  {
    name: 'appointment_cancellation_completion',
    purpose:
      'whether the main agent completes a requested cancellation and confirms it',
    success: [
      'The main agent cancels the appointment and states that it is cancelled.',
    ],
    failure: [
      'The main agent ends the call while the cancellation is not confirmed.',
    ],
  },
];

const GENERAL_SEEDS: DraftSeed[] = [
  {
    name: 'greeting_and_identification',
    purpose:
      'whether the main agent greets the testing agent and names the business at the start of the call',
    success: [
      'The first main agent turn holds a greeting and the business name.',
    ],
    failure: [
      'The main agent starts without a greeting or without the business name.',
    ],
  },
  {
    name: 'caller_intent_understanding',
    purpose:
      'whether the main agent correctly understands the request of the testing agent',
    success: [
      'The main agent restates or acts on the actual request of the testing agent.',
    ],
    failure: [
      'The main agent answers a different question than the one the testing agent asked.',
    ],
  },
  {
    name: 'information_accuracy',
    purpose:
      'whether the information that the main agent gives agrees with the agent description',
    success: [
      'Every fact that the main agent states agrees with its description.',
    ],
    failure: ['The main agent states a fact that its description contradicts.'],
  },
  {
    name: 'escalation_when_unable_to_help',
    purpose:
      'whether the main agent offers a next step when it cannot fully answer the testing agent',
    success: [
      'The main agent offers a transfer, a callback, or to take a message.',
    ],
    failure: ['The main agent leaves the testing agent with no next step.'],
  },
  {
    name: 'call_closing',
    purpose:
      'whether the main agent closes the call politely after the request is handled',
    success: [
      'The main agent asks if anything else is needed and says goodbye.',
    ],
    failure: [
      'The main agent ends the call abruptly while the testing agent still talks.',
    ],
  },
];

const numbered = (items: string[]) =>
  items.map((item, index) => `${index + 1}. ${item}`).join('\n');

const toDraft = (seed: DraftSeed, agentName: string): GeneratedMetricDraft => ({
  name: seed.name,
  description: [
    `This metric measures ${seed.purpose} on calls with ${agentName}.`,
    `Success criteria (True):\n${numbered(seed.success)}`,
    `Failure criteria (False):\n${numbered(seed.failure)}`,
  ].join('\n\n'),
  evalType: MetricEvalType.binary,
});

const seedsFor = (description: string) => {
  if (APPOINTMENT_PATTERN.test(description)) return APPOINTMENT_SEEDS;
  return GENERAL_SEEDS;
};

export const generatedMetricsMock = (
  agent: { name: string; description: string },
  count: number,
): GeneratedMetricDraft[] =>
  seedsFor(agent.description)
    .slice(0, count)
    .map((seed) => toDraft(seed, agent.name));
