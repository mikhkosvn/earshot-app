export const LabStep = {
  recording_delete: 'labs.recording_delete',
} as const;

export type LabStep = (typeof LabStep)[keyof typeof LabStep];
