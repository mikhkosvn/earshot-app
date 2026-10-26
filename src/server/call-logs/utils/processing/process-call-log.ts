import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { CallProcessingStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { CallLogStep } from '@/server/call-logs/constants/call-log-step';
import type { CallProcessingInput } from '@/server/call-logs/types';
import { downloadRecording } from '@/server/call-logs/utils/processing/download-recording';
import { scoreCallLog } from '@/server/call-logs/utils/processing/score-call-log';
import {
  applyRecordingDetails,
  attachRecording,
} from '@/server/call-logs/utils/processing/store-recording';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { readFileBytes } from '@/server/files/read-file-bytes';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import { transcribeRecording } from '@/server/transcription/transcribe-recording';
import type { TranscriptionFile } from '@/server/transcription/types';

const callLogSelect = {
  projectId: true,
  conversationId: true,
  agent: { select: { name: true, description: true } },
  conversation: {
    select: {
      startedAt: true,
      _count: { select: { turns: true } },
      recordingFile: {
        select: { storageKey: true, contentType: true, fileName: true },
      },
      turns: {
        orderBy: { endTime: Prisma.SortOrder.desc },
        take: 1,
        select: { endTime: true },
      },
    },
  },
} satisfies Prisma.CallLogSelect;

type CallLogRecord = Prisma.CallLogGetPayload<{ select: typeof callLogSelect }>;

interface RecordingResult {
  file: TranscriptionFile | null;
  durationSeconds: number | null;
}

const NO_RECORDING: RecordingResult = { file: null, durationSeconds: null };

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The call processing failed.';
};

const setStatus = (callLogId: number, status: CallProcessingStatus) =>
  prisma.callLog.update({ where: { id: callLogId }, data: { status } });

const downloadedFile = async (
  callLogId: number,
  record: CallLogRecord,
  recordingUrl: string,
): Promise<RecordingResult> => {
  try {
    const file = await downloadRecording(recordingUrl);
    const durationSeconds = await attachRecording({
      projectId: record.projectId,
      conversationId: record.conversationId,
      file,
    });
    return { file, durationSeconds };
  } catch (error) {
    recordStepFailure(CallLogStep.recording_download, error);
    await prisma.callLog.update({
      where: { id: callLogId },
      data: {
        errorMessage: `The recording did not download: ${errorText(error)}`,
      },
    });
    return NO_RECORDING;
  }
};

const storedFile = async (record: CallLogRecord): Promise<RecordingResult> => {
  const stored = record.conversation.recordingFile;
  if (!stored) return NO_RECORDING;
  const file: TranscriptionFile = {
    data: await readFileBytes(stored),
    contentType: stored.contentType,
    fileName: stored.fileName,
  };
  const durationSeconds = await applyRecordingDetails(
    record.conversationId,
    file,
  );
  return { file, durationSeconds };
};

const transcriptionContext = (record: CallLogRecord) => {
  if (!record.agent) return undefined;
  return {
    agentName: record.agent.name,
    agentDescription: record.agent.description,
  };
};

const transcribeInto = async (
  record: CallLogRecord,
  file: TranscriptionFile,
) => {
  const transcription = await transcribeRecording({
    file,
    context: transcriptionContext(record),
  });
  await prisma.transcriptTurn.createMany({
    data: transcription.turns.map((turn, position) => ({
      conversationId: record.conversationId,
      position,
      role: turn.role,
      content: turn.content,
      startTime: turn.startTime,
      endTime: turn.endTime,
    })),
  });
  if (transcription.testingChannelIndex !== null) {
    await prisma.conversation.update({
      where: { id: record.conversationId },
      data: { testingChannelIndex: transcription.testingChannelIndex },
    });
  }
  addEventFields({
    transcription: { turn_count: transcription.turns.length },
  });
  return (
    transcription.durationSeconds ??
    Math.max(0, ...transcription.turns.map((turn) => turn.endTime))
  );
};

const lastTurnEnd = (record: CallLogRecord) =>
  record.conversation.turns[0]?.endTime ?? null;

const setEndedAt = async (
  record: CallLogRecord,
  durationSeconds: number | null,
) => {
  const startedAt = record.conversation.startedAt;
  if (!startedAt || durationSeconds === null) return;
  await prisma.conversation.update({
    where: { id: record.conversationId },
    data: { endedAt: new Date(startedAt.getTime() + durationSeconds * 1000) },
  });
};

const recordingOf = (
  callLogId: number,
  record: CallLogRecord,
  recordingUrl: string | null,
) => {
  if (recordingUrl) return downloadedFile(callLogId, record, recordingUrl);
  return storedFile(record);
};

const runSteps = async (
  { callLogId, recordingUrl }: CallProcessingInput,
  record: CallLogRecord,
) => {
  const hasTurns = record.conversation._count.turns > 0;
  addEventFields({
    call_log: {
      has_recording_url: recordingUrl !== null,
      turn_count: record.conversation._count.turns,
    },
  });
  if (recordingUrl || !hasTurns) {
    await setStatus(callLogId, CallProcessingStatus.transcribing);
  }
  const { file, durationSeconds } = await recordingOf(
    callLogId,
    record,
    recordingUrl,
  );
  addEventFields({ call_log: { has_recording: file !== null } });
  if (!hasTurns && file) {
    const transcribed = await transcribeInto(record, file);
    await setEndedAt(record, durationSeconds ?? transcribed);
    return;
  }
  await setEndedAt(record, durationSeconds ?? lastTurnEnd(record));
};

export const processCallLog = async (input: CallProcessingInput) => {
  const record = await prisma.callLog.findUniqueOrThrow({
    where: { id: input.callLogId },
    select: callLogSelect,
  });
  addEventFields({
    call_log: { id: input.callLogId },
    project: { id: record.projectId },
    conversation: { id: record.conversationId },
  });
  try {
    await runSteps(input, record);
    const verdict = await scoreCallLog({
      callLogId: input.callLogId,
      event: WebhookEvent.callLogCompleted,
      origin: input.origin,
    });
    addEventFields({ call_log: { passed: verdict.passed } });
  } catch (error) {
    await prisma.callLog.update({
      where: { id: input.callLogId },
      data: {
        status: CallProcessingStatus.failed,
        errorMessage: errorText(error),
      },
    });
    throw error;
  }
};
