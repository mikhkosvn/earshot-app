import 'server-only';

import { ChatRole } from '@/generated/prisma/enums';
import { AGENT_SPEAKS_FIRST_QUESTION } from '@/server/evaluator-generation/constants';

interface MessageRow {
  role: ChatRole;
  content: string;
}

const answerAfterQuestion = (messages: MessageRow[]) => {
  const questionIndex = messages.findIndex(
    (message) =>
      message.role === ChatRole.assistant &&
      message.content === AGENT_SPEAKS_FIRST_QUESTION,
  );
  if (questionIndex < 0) return null;
  return (
    messages
      .slice(questionIndex + 1)
      .find((message) => message.role === ChatRole.user)?.content ?? null
  );
};

export const resolveAgentSpeaksFirst = (
  agentSpeaksFirst: boolean | null,
  messages: MessageRow[],
) => {
  if (agentSpeaksFirst !== null) return agentSpeaksFirst;
  const answer = answerAfterQuestion(messages)?.trim().toLowerCase();
  if (!answer) return null;
  if (answer.startsWith('y')) return true;
  if (answer.startsWith('n')) return false;
  return null;
};
