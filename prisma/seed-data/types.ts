import type {
  BackgroundNoise,
  ComparisonOperator,
  Gender,
  InterruptionLevel,
  Language,
  MetricCategory,
  MetricEvalType,
  MetricSubCategory,
  MetricType,
  PredefinedMetricBadge,
  VoiceModel,
} from '@/generated/prisma/enums';

export type PredefinedMetricSeed = {
  code: string;
  slug: string | null;
  name: string;
  description: string;
  type: MetricType;
  evalType: MetricEvalType;
  functionName: string | null;
  customCode: string | null;
  category: MetricCategory;
  subCategory: MetricSubCategory | null;
  badge: PredefinedMetricBadge | null;
  audioEnabled: boolean;
  simulationEnabled: boolean;
  observabilityEnabled: boolean;
  configuration: Record<string, number> | null;
  editable: boolean;
  addToNewProjects: boolean;
  defaultDisplayOrder: number | null;
  rubricOperator: ComparisonOperator | null;
  rubricNumberValue: number | null;
  rubricBooleanValue: boolean | null;
  enumOptions: string[];
};

export type PersonalitySeed = {
  catalogId?: number;
  name: string;
  description: string;
  prompt: string;
  language: Language;
  accent: string | null;
  gender: Gender;
  isStarred: boolean;
  enabledByDefault: boolean;
  voiceModel: VoiceModel | null;
  voiceId: string | null;
  speed: number | null;
  interruptionLevel: InterruptionLevel | null;
  backgroundNoise: BackgroundNoise;
  idleTimeoutSeconds?: number;
  idleMessageMaxSpokenCount?: number;
  startSpeakingWaitSeconds?: number;
  stopSpeakingNumWords?: number;
  stopSpeakingBackoffSeconds?: number;
};
