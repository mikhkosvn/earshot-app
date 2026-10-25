-- CreateEnum
CREATE TYPE "Language" AS ENUM ('multi', 'af', 'ar', 'bn', 'bg', 'zh', 'cs', 'da', 'nl', 'en', 'et', 'fi', 'fr', 'de', 'el', 'gu', 'hi', 'he', 'hu', 'id', 'it', 'ja', 'kn', 'kk', 'ko', 'ms', 'ml', 'mr', 'no', 'pl', 'pa', 'pt', 'ro', 'ru', 'sk', 'es', 'sv', 'th', 'tr', 'tl', 'ta', 'te', 'uk', 'uz', 'vi');

-- CreateEnum
CREATE TYPE "AgentProvider" AS ENUM ('custom', 'vapi', 'retell', 'synthflow', 'elevenlabs', 'bland', 'livekit', 'pipecat', 'koreai', 'agentforce', 'genesys', 'cisco', 'amazon_connect', 'agora', 'telnyx', 'sierra', 'gemini_cx', 'assemblyai', 'smallest');

-- CreateEnum
CREATE TYPE "RedactionField" AS ENUM ('person_name', 'age', 'phone_number', 'email_address', 'date', 'time', 'location', 'origin', 'gender_sexuality', 'physical_attribute', 'occupation', 'username', 'password', 'ip_address', 'url', 'filename', 'event', 'vehicle_id', 'dob', 'healthcare_number', 'medical_professional', 'credit_card', 'account_number', 'bank_account', 'money', 'ssn', 'passport_number', 'driver_license', 'numerical_pii');

-- CreateEnum
CREATE TYPE "KnowledgeConnectorType" AS ENUM ('google_bigquery', 'website_scraper');

-- CreateEnum
CREATE TYPE "HistoryChangeType" AS ENUM ('created', 'updated');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('normal', 'significant_change', 'threshold', 'insight_new_mode', 'insight_uptick');

-- CreateEnum
CREATE TYPE "ChangeDirection" AS ENUM ('both', 'increase', 'decrease');

-- CreateEnum
CREATE TYPE "ThresholdOperator" AS ENUM ('gt', 'lt', 'outside');

-- CreateEnum
CREATE TYPE "CallProcessingStatus" AS ENUM ('pending', 'transcribing', 'evaluating', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "TranscriptRole" AS ENUM ('main_agent', 'testing_agent');

-- CreateEnum
CREATE TYPE "MetricEvaluationStatus" AS ENUM ('pending', 'running', 'completed', 'skipped', 'failed');

-- CreateEnum
CREATE TYPE "DashboardSource" AS ENUM ('call_logs', 'runs');

-- CreateEnum
CREATE TYPE "ChartType" AS ENUM ('line', 'bar', 'pie', 'stat');

-- CreateEnum
CREATE TYPE "WidgetField" AS ENUM ('stat', 'success', 'duration', 'is_reviewed', 'call_ended_reason', 'dropoff_point', 'topic', 'metric_evaluations.value', 'metadata', 'scenario.name');

-- CreateEnum
CREATE TYPE "WidgetAggregation" AS ENUM ('count', 'sum', 'avg', 'min', 'max', 'p50', 'p95', 'p99');

-- CreateEnum
CREATE TYPE "WidgetTimePeriod" AS ENUM ('hour', 'day', 'week', 'month');

-- CreateEnum
CREATE TYPE "WidgetGroupByType" AS ENUM ('field', 'bucket');

-- CreateEnum
CREATE TYPE "FolderSystemRole" AS ENUM ('regression_suite', 'default');

-- CreateEnum
CREATE TYPE "ScenarioType" AS ENUM ('instruction', 'conditional_actions');

-- CreateEnum
CREATE TYPE "ScenarioTool" AS ENUM ('VAPI_TOOL_DTMF', 'RECEIVE_DTMF', 'VAPI_TOOL_END_CALL', 'VAPI_TOOL_END_CALL_ONLY_ON_TRANSFER', 'SEND_SMS_TOOL_CALL', 'CALL_HOLD');

-- CreateEnum
CREATE TYPE "CreationMethod" AS ENUM ('manual', 'manual_with_generate', 'auto_generated', 'json_spec');

-- CreateEnum
CREATE TYPE "TestProfileVariableSide" AS ENUM ('main_agent', 'testing_agent');

-- CreateEnum
CREATE TYPE "GenerationSessionStatus" AS ENUM ('in_progress', 'completed');

-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('user', 'assistant');

-- CreateEnum
CREATE TYPE "InsightStatus" AS ENUM ('pending', 'running', 'succeeded', 'failed', 'skipped_no_failures');

-- CreateEnum
CREATE TYPE "PatternReviewStatus" AS ENUM ('pending', 'running', 'ready', 'rebuilding', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "PatternReviewStage" AS ENUM ('sampling', 'grouping', 'reading_fixes', 'optimizing');

-- CreateEnum
CREATE TYPE "OptimizationStatus" AS ENUM ('queued', 'running', 'awaiting_review', 'applied', 'dismissed', 'failed');

-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('basic', 'custom_prompt', 'custom_code', 'llm_judge');

-- CreateEnum
CREATE TYPE "MetricEvalType" AS ENUM ('binary', 'continuous_qualitative', 'numeric', 'enum');

-- CreateEnum
CREATE TYPE "EvaluationTrigger" AS ENUM ('always', 'automatic', 'custom');

-- CreateEnum
CREATE TYPE "TriggerType" AS ENUM ('llm_judge', 'custom_code');

-- CreateEnum
CREATE TYPE "MetricCategory" AS ENUM ('Speech Quality', 'Conversation Quality', 'Accuracy', 'Customer Experience');

-- CreateEnum
CREATE TYPE "MetricSubCategory" AS ENUM ('Latency', 'Interruption', 'Silence', 'Termination', 'Repetition');

-- CreateEnum
CREATE TYPE "MetricPriority" AS ENUM ('critical', 'non-critical', 'not_a_bug');

-- CreateEnum
CREATE TYPE "PredefinedMetricBadge" AS ENUM ('needs_configuration', 'beta');

-- CreateEnum
CREATE TYPE "ComparisonOperator" AS ENUM ('eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in');

-- CreateEnum
CREATE TYPE "NotifyOn" AS ENUM ('never', 'success', 'failure', 'both');

-- CreateEnum
CREATE TYPE "MonitorRunStatus" AS ENUM ('queued', 'running', 'completed', 'failed', 'skipped');

-- CreateEnum
CREATE TYPE "Timezone" AS ENUM ('Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers', 'Africa/Asmara', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul', 'Africa/Bissau', 'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Douala', 'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Johannesburg', 'Africa/Juba', 'Africa/Kampala', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru', 'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao_Tome', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek', 'America/Adak', 'America/Anchorage', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/New_York', 'America/Phoenix', 'America/Sao_Paulo', 'Asia/Dubai', 'Asia/Hong_Kong', 'Asia/Kolkata', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Sydney', 'Europe/Amsterdam', 'Europe/Berlin', 'Europe/London', 'Europe/Madrid', 'Europe/Moscow', 'Europe/Paris', 'Europe/Rome', 'Pacific/Auckland', 'Pacific/Honolulu', 'US/Central', 'US/Eastern', 'US/Mountain', 'US/Pacific', 'UTC');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'neutral');

-- CreateEnum
CREATE TYPE "InterruptionLevel" AS ENUM ('off', 'low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "VoiceModel" AS ENUM ('eleven_multilingual_v2', 'eleven_turbo_v2_5', 'eleven_flash_v2_5', 'eleven_v3_conversational', 'sonic-3.5');

-- CreateEnum
CREATE TYPE "BackgroundNoise" AS ENUM ('off', 'office', 'dog_barking', 'baby_crying', 'keyboard_typing', 'coughing', 'background_printer', 'quiet_room_tone', 'air_conditioner', 'construction_site', 'busy_street_traffic', 'airport_boarding', 'inside_moving_car', 'inside_moving_train', 'public_park', 'rain_and_thunder', 'windy_day', 'restaurant_ambience', 'shopping_mall', 'stadium_crowd', 'standard_hiss', 'static_radio_noise', 'fan_buzz', 'low_ship_humming', 'two_people_talking', 'train_station', 'custom_url');

-- CreateEnum
CREATE TYPE "CartesiaEmotion" AS ENUM ('neutral', 'happy', 'excited', 'enthusiastic', 'elated', 'euphoric', 'triumphant', 'amazed', 'surprised', 'flirtatious', 'joking/comedic', 'curious', 'content', 'peaceful', 'serene', 'calm', 'grateful', 'affectionate', 'trust', 'sympathetic', 'anticipation', 'mysterious', 'angry', 'mad', 'outraged', 'frustrated', 'agitated', 'threatened', 'disgusted', 'contempt', 'envious', 'sarcastic', 'ironic', 'sad', 'dejected', 'melancholic', 'disappointed', 'hurt', 'guilty', 'bored', 'tired', 'rejected', 'nostalgic', 'wistful', 'apologetic', 'hesitant', 'insecure', 'confused', 'resigned', 'anxious', 'panicked', 'alarmed', 'scared', 'proud', 'confident', 'distant', 'skeptical', 'contemplative', 'determined');

-- CreateEnum
CREATE TYPE "JobKind" AS ENUM ('metric_generation', 'metric_pattern_review', 'evaluator_generation', 'evaluator_assistant', 'test_call', 'reevaluation', 'export', 'metric_optimization', 'insight_generation', 'call_import');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('queued', 'running', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "ProviderKeyProvider" AS ENUM ('vapi', 'retell', 'synthflow', 'elevenlabs', 'bland', 'livekit', 'pipecat');

-- CreateEnum
CREATE TYPE "WebhookNotification" AS ENUM ('result.pre_trigger', 'result.success', 'result.failure', 'result.error', 'cronjob.success', 'cronjob.failure', 'cronjob.error', 'call_log.success', 'call_log.failure', 'call_log_reevaluated.success', 'call_log_reevaluated.failure', 'daily.report');

-- CreateEnum
CREATE TYPE "ShareLinkTarget" AS ENUM ('result', 'run', 'call_log');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('pending', 'in_queue', 'scaling_up', 'running', 'in_progress', 'evaluating', 'completed', 'failed', 'timeout', 'cancelled');

-- CreateEnum
CREATE TYPE "CallEvaluationStatus" AS ENUM ('success', 'failure', 'reviewed_success', 'reviewed_failure');

-- CreateEnum
CREATE TYPE "ResultSource" AS ENUM ('user', 'api', 'schedule');

-- CreateEnum
CREATE TYPE "CallerNumberMode" AS ENUM ('same_number', 'different_numbers');

-- CreateEnum
CREATE TYPE "AiSummaryStatus" AS ENUM ('pending', 'completed', 'skipped_no_failures');

-- CreateEnum
CREATE TYPE "PhoneNumberProvider" AS ENUM ('twilio', 'telnyx', 'plivo');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('admin', 'member', 'view_only');

-- CreateEnum
CREATE TYPE "NotificationSeverity" AS ENUM ('success', 'info', 'warning', 'error');

-- CreateEnum
CREATE TYPE "NotificationEventType" AS ENUM ('scenario_generation_complete', 'metric_generation_complete', 'run_completed', 'monitor_failed', 'alert_triggered', 'call_import_complete', 'job_failed');

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'en',
    "phoneNumber" TEXT,
    "inbound" BOOLEAN NOT NULL DEFAULT true,
    "agentSpeaksFirst" BOOLEAN,
    "provider" "AgentProvider" NOT NULL DEFAULT 'custom',
    "providerAgentId" TEXT,
    "providerApiKeyEncrypted" TEXT,
    "providerPublicKeyEncrypted" TEXT,
    "providerConfig" JSONB,
    "autoImportCalls" BOOLEAN NOT NULL DEFAULT false,
    "autoSyncPrompt" BOOLEAN NOT NULL DEFAULT false,
    "autoDialOutbound" BOOLEAN NOT NULL DEFAULT false,
    "sendPostConversationMetadata" BOOLEAN NOT NULL DEFAULT false,
    "webhookUrl" TEXT,
    "webhookSecretEncrypted" TEXT,
    "mockToolsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "defaultTestProfileId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentRedactionField" (
    "agentId" INTEGER NOT NULL,
    "field" "RedactionField" NOT NULL,

    CONSTRAINT "AgentRedactionField_pkey" PRIMARY KEY ("agentId","field")
);

-- CreateTable
CREATE TABLE "AgentVersion" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "name" TEXT,
    "changeType" "HistoryChangeType" NOT NULL,
    "changeReason" TEXT,
    "snapshot" JSONB NOT NULL,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeBaseFile" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KnowledgeBaseFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeBaseConnector" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "KnowledgeConnectorType" NOT NULL,
    "syncEnabled" BOOLEAN NOT NULL DEFAULT true,
    "syncIntervalDays" INTEGER NOT NULL DEFAULT 1,
    "credentialsEncrypted" TEXT,
    "query" TEXT,
    "url" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeBaseConnector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockTool" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MockTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockToolMapping" (
    "id" SERIAL NOT NULL,
    "mockToolId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB NOT NULL,
    "responseStatusCode" INTEGER,
    "responseHeaders" JSONB,
    "responseDelaySeconds" DOUBLE PRECISION,

    CONSTRAINT "MockToolMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DynamicVariable" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DynamicVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentPersonality" (
    "agentId" INTEGER NOT NULL,
    "personalityId" INTEGER NOT NULL,

    CONSTRAINT "AgentPersonality_pkey" PRIMARY KEY ("agentId","personalityId")
);

-- CreateTable
CREATE TABLE "AlertRule" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AlertType" NOT NULL DEFAULT 'normal',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "filters" JSONB,
    "windowSize" INTEGER,
    "stdMultiplier" DOUBLE PRECISION,
    "ewmaAlpha" DOUBLE PRECISION,
    "direction" "ChangeDirection",
    "thresholdOperator" "ThresholdOperator",
    "thresholdValue" DOUBLE PRECISION,
    "thresholdUpperValue" DOUBLE PRECISION,
    "minBreaches" INTEGER,
    "minCalls" INTEGER,
    "minCount" INTEGER,
    "multiplier" DOUBLE PRECISION,
    "windowHours" INTEGER,
    "baselineHours" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlertRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertTrigger" (
    "id" SERIAL NOT NULL,
    "alertRuleId" INTEGER NOT NULL,
    "conversationId" INTEGER,
    "metricEvaluationId" INTEGER,
    "failureCategoryId" INTEGER,
    "observedValue" DOUBLE PRECISION,
    "message" TEXT,
    "triggeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallLog" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "agentId" INTEGER,
    "agentVersionId" INTEGER,
    "conversationId" INTEGER NOT NULL,
    "externalCallId" TEXT NOT NULL,
    "customerNumber" TEXT,
    "status" "CallProcessingStatus" NOT NULL DEFAULT 'pending',
    "evaluationStatus" "CallEvaluationStatus",
    "feedback" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "recordingFileId" TEXT,
    "waveform" JSONB,
    "testingChannelIndex" INTEGER,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "ringingDurationSeconds" DOUBLE PRECISION,
    "endedReason" TEXT,
    "providerCallId" TEXT,
    "providerCallData" JSONB,
    "metadata" JSONB,
    "dynamicVariables" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscriptTurn" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "role" "TranscriptRole" NOT NULL,
    "content" TEXT NOT NULL,
    "startTime" DOUBLE PRECISION,
    "endTime" DOUBLE PRECISION,

    CONSTRAINT "TranscriptTurn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricEvaluation" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "metricId" INTEGER NOT NULL,
    "status" "MetricEvaluationStatus" NOT NULL DEFAULT 'pending',
    "valueNumber" DOUBLE PRECISION,
    "valueBoolean" BOOLEAN,
    "valueText" TEXT,
    "normalizedScore" DOUBLE PRECISION,
    "explanation" TEXT[],
    "extra" JSONB,
    "errorMessage" TEXT,
    "evaluatedAt" TIMESTAMP(3),
    "thumbsUp" BOOLEAN,
    "voteFeedback" TEXT,
    "votedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "source" "DashboardSource" NOT NULL,
    "filters" JSONB,
    "includeInDailyReport" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Widget" (
    "id" SERIAL NOT NULL,
    "dashboardId" INTEGER NOT NULL,
    "name" TEXT,
    "chartType" "ChartType" NOT NULL,
    "field" "WidgetField" NOT NULL,
    "metricId" INTEGER,
    "metadataKey" TEXT,
    "aggregation" "WidgetAggregation",
    "timePeriod" "WidgetTimePeriod",
    "groupByType" "WidgetGroupByType",
    "groupByField" TEXT,
    "groupByIntervalMs" INTEGER,
    "filters" JSONB,
    "sortPosition" INTEGER NOT NULL,
    "layoutX" INTEGER,
    "layoutY" INTEGER,
    "layoutW" INTEGER,
    "layoutH" INTEGER,
    "displayOptions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedView" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedViewAgent" (
    "id" SERIAL NOT NULL,
    "savedViewId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,
    "agentVersionId" INTEGER,

    CONSTRAINT "SavedViewAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunsOverviewConfiguration" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "rangeFrom" TEXT NOT NULL,
    "rangeTo" TEXT NOT NULL,
    "filters" JSONB,
    "includeMetricVisibility" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RunsOverviewConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunsOverviewHiddenMetric" (
    "configurationId" INTEGER NOT NULL,
    "metricId" INTEGER NOT NULL,

    CONSTRAINT "RunsOverviewHiddenMetric_pkey" PRIMARY KEY ("configurationId","metricId")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "systemRole" "FolderSystemRole",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestProfile" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestProfileVariable" (
    "id" SERIAL NOT NULL,
    "testProfileId" INTEGER NOT NULL,
    "side" "TestProfileVariableSide" NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "TestProfileVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluator" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "folderId" INTEGER,
    "agentId" INTEGER,
    "personalityId" INTEGER,
    "testProfileId" INTEGER,
    "phoneNumberId" INTEGER,
    "generationSessionId" INTEGER,
    "name" TEXT NOT NULL,
    "scenarioType" "ScenarioType" NOT NULL DEFAULT 'instruction',
    "instructions" TEXT NOT NULL,
    "expectedOutcomePrompt" TEXT,
    "firstMessage" TEXT,
    "simulationDescription" TEXT,
    "language" "Language" NOT NULL DEFAULT 'en',
    "maxDurationSeconds" INTEGER,
    "creationMethod" "CreationMethod" NOT NULL DEFAULT 'manual',
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evaluator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluatorTag" (
    "evaluatorId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "EvaluatorTag_pkey" PRIMARY KEY ("evaluatorId","tagId")
);

-- CreateTable
CREATE TABLE "EvaluatorTool" (
    "evaluatorId" INTEGER NOT NULL,
    "tool" "ScenarioTool" NOT NULL,

    CONSTRAINT "EvaluatorTool_pkey" PRIMARY KEY ("evaluatorId","tool")
);

-- CreateTable
CREATE TABLE "EvaluatorMetric" (
    "evaluatorId" INTEGER NOT NULL,
    "metricId" INTEGER NOT NULL,

    CONSTRAINT "EvaluatorMetric_pkey" PRIMARY KEY ("evaluatorId","metricId")
);

-- CreateTable
CREATE TABLE "EvaluatorExpectedToolCall" (
    "id" SERIAL NOT NULL,
    "evaluatorId" INTEGER NOT NULL,
    "mockToolId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB NOT NULL,

    CONSTRAINT "EvaluatorExpectedToolCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluatorVersion" (
    "id" SERIAL NOT NULL,
    "evaluatorId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "name" TEXT,
    "changeType" "HistoryChangeType" NOT NULL,
    "changeReason" TEXT,
    "snapshot" JSONB NOT NULL,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluatorVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluatorGenerationSession" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "agentId" INTEGER,
    "title" TEXT NOT NULL,
    "status" "GenerationSessionStatus" NOT NULL DEFAULT 'in_progress',
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluatorGenerationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluatorGenerationMessage" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "role" "ChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluatorGenerationMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricInsightConfig" (
    "metricId" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "passOperator" "ComparisonOperator" NOT NULL,
    "passNumberValue" DOUBLE PRECISION,
    "passBooleanValue" BOOLEAN,
    "passTextValues" TEXT[],
    "triageFailureLimit" INTEGER,
    "alertOnNewCategories" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricInsightConfig_pkey" PRIMARY KEY ("metricId")
);

-- CreateTable
CREATE TABLE "FailureModeInsight" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "numCallsAnalyzed" INTEGER NOT NULL DEFAULT 0,
    "totalFailuresInWindow" INTEGER NOT NULL DEFAULT 0,
    "status" "InsightStatus" NOT NULL DEFAULT 'pending',
    "headline" TEXT,
    "errorMessage" TEXT,
    "durationSeconds" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FailureModeInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FailureCategory" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dismissedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FailureCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FailureCategoryAssignment" (
    "metricEvaluationId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "explanation" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FailureCategoryAssignment_pkey" PRIMARY KEY ("metricEvaluationId")
);

-- CreateTable
CREATE TABLE "FailureModeInsightCategory" (
    "insightId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "summary" TEXT,

    CONSTRAINT "FailureModeInsightCategory_pkey" PRIMARY KEY ("insightId","categoryId")
);

-- CreateTable
CREATE TABLE "LabTestSet" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabTestSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabReview" (
    "id" SERIAL NOT NULL,
    "testSetId" INTEGER NOT NULL,
    "metricId" INTEGER NOT NULL,
    "expectedNumber" DOUBLE PRECISION,
    "expectedBoolean" BOOLEAN,
    "expectedText" TEXT,
    "actualNumber" DOUBLE PRECISION,
    "actualBoolean" BOOLEAN,
    "actualText" TEXT,
    "actualExplanation" TEXT[],
    "actualEvaluatedAt" TIMESTAMP(3),
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricPatternReview" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "jobId" TEXT,
    "optimizationSessionId" INTEGER,
    "status" "PatternReviewStatus" NOT NULL DEFAULT 'pending',
    "stage" "PatternReviewStage",
    "roundIndex" INTEGER NOT NULL DEFAULT 0,
    "insufficientHistory" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "rebuiltAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricPatternReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatternReviewGroup" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "verdictNumber" DOUBLE PRECISION,
    "verdictBoolean" BOOLEAN,
    "verdictText" TEXT,
    "inconsistent" BOOLEAN NOT NULL DEFAULT false,
    "degraded" BOOLEAN NOT NULL DEFAULT false,
    "overflow" BOOLEAN NOT NULL DEFAULT false,
    "representativeSampleId" INTEGER,
    "correctionNumber" DOUBLE PRECISION,
    "correctionBoolean" BOOLEAN,
    "correctionText" TEXT,
    "correctionNote" TEXT,
    "correctedAt" TIMESTAMP(3),

    CONSTRAINT "PatternReviewGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatternReviewEvidence" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "speaker" "TranscriptRole" NOT NULL,
    "timeSeconds" DOUBLE PRECISION,
    "text" TEXT NOT NULL,
    "isKey" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PatternReviewEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatternReviewSample" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "verdictNumber" DOUBLE PRECISION,
    "verdictBoolean" BOOLEAN,
    "verdictText" TEXT,
    "skipped" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "explanation" TEXT[],

    CONSTRAINT "PatternReviewSample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricOptimizationSession" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "jobId" TEXT,
    "status" "OptimizationStatus" NOT NULL DEFAULT 'queued',
    "simplifiedPrompt" TEXT,
    "summary" TEXT,
    "oldCorrectCount" INTEGER,
    "oldTotalCount" INTEGER,
    "newCorrectCount" INTEGER,
    "newTotalCount" INTEGER,
    "appliedAt" TIMESTAMP(3),
    "appliedById" INTEGER,
    "dismissedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricOptimizationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptimizationSessionTestSet" (
    "sessionId" INTEGER NOT NULL,
    "testSetId" INTEGER NOT NULL,

    CONSTRAINT "OptimizationSessionTestSet_pkey" PRIMARY KEY ("sessionId","testSetId")
);

-- CreateTable
CREATE TABLE "MetricOptimizationProposal" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "type" "MetricType" NOT NULL,
    "description" TEXT,
    "customCode" TEXT,
    "evaluationTrigger" "EvaluationTrigger" NOT NULL,
    "triggerType" "TriggerType" NOT NULL,
    "evaluationTriggerPrompt" TEXT,
    "evaluationTriggerCustomCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetricOptimizationProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalReviewResult" (
    "proposalId" INTEGER NOT NULL,
    "labReviewId" INTEGER NOT NULL,
    "actualNumber" DOUBLE PRECISION,
    "actualBoolean" BOOLEAN,
    "actualText" TEXT,
    "explanation" TEXT[],
    "matched" BOOLEAN NOT NULL,

    CONSTRAINT "ProposalReviewResult_pkey" PRIMARY KEY ("proposalId","labReviewId")
);

-- CreateTable
CREATE TABLE "MetricOptimizerSchedule" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cronExpression" TEXT NOT NULL,
    "timezone" "Timezone" NOT NULL DEFAULT 'UTC',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "nextRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricOptimizerSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredefinedMetric" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "MetricType" NOT NULL,
    "evalType" "MetricEvalType" NOT NULL,
    "functionName" TEXT,
    "customCode" TEXT,
    "category" "MetricCategory" NOT NULL,
    "subCategory" "MetricSubCategory",
    "badge" "PredefinedMetricBadge",
    "audioEnabled" BOOLEAN NOT NULL DEFAULT false,
    "simulationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "observabilityEnabled" BOOLEAN NOT NULL DEFAULT true,
    "configuration" JSONB,
    "editable" BOOLEAN NOT NULL DEFAULT true,
    "addToNewProjects" BOOLEAN NOT NULL DEFAULT false,
    "defaultDisplayOrder" INTEGER,
    "rubricOperator" "ComparisonOperator",
    "rubricNumberValue" DOUBLE PRECISION,
    "rubricBooleanValue" BOOLEAN,

    CONSTRAINT "PredefinedMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredefinedMetricEnumOption" (
    "predefinedMetricId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "PredefinedMetricEnumOption_pkey" PRIMARY KEY ("predefinedMetricId","position")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "predefinedMetricId" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "type" "MetricType" NOT NULL DEFAULT 'llm_judge',
    "evalType" "MetricEvalType" NOT NULL,
    "audioEnabled" BOOLEAN NOT NULL DEFAULT false,
    "customCode" TEXT,
    "evaluationTrigger" "EvaluationTrigger" NOT NULL DEFAULT 'always',
    "triggerType" "TriggerType" NOT NULL DEFAULT 'llm_judge',
    "evaluationTriggerPrompt" TEXT,
    "evaluationTriggerCustomCode" TEXT,
    "configuration" JSONB,
    "priority" "MetricPriority",
    "displayOrder" INTEGER NOT NULL,
    "observabilityEnabled" BOOLEAN NOT NULL DEFAULT true,
    "simulationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "samplingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "sampleRate" DOUBLE PRECISION,
    "addToNewAgents" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricEnumOption" (
    "metricId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "MetricEnumOption_pkey" PRIMARY KEY ("metricId","position")
);

-- CreateTable
CREATE TABLE "MetricAgent" (
    "metricId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,

    CONSTRAINT "MetricAgent_pkey" PRIMARY KEY ("metricId","agentId")
);

-- CreateTable
CREATE TABLE "MetricDependency" (
    "metricId" INTEGER NOT NULL,
    "dependsOnMetricId" INTEGER NOT NULL,

    CONSTRAINT "MetricDependency_pkey" PRIMARY KEY ("metricId","dependsOnMetricId")
);

-- CreateTable
CREATE TABLE "MetricVersion" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "name" TEXT,
    "changeType" "HistoryChangeType" NOT NULL,
    "changeReason" TEXT,
    "snapshot" JSONB NOT NULL,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetricVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricRule" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "operator" "ComparisonOperator" NOT NULL,
    "numberValue" DOUBLE PRECISION,
    "booleanValue" BOOLEAN,
    "textValues" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RubricRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monitor" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cronExpression" TEXT NOT NULL,
    "timezone" "Timezone" NOT NULL DEFAULT 'UTC',
    "frequency" INTEGER NOT NULL DEFAULT 1,
    "concurrencyLimit" INTEGER,
    "callsPerSecond" DOUBLE PRECISION,
    "callerNumberMode" "CallerNumberMode" NOT NULL DEFAULT 'same_number',
    "agentNumber" TEXT,
    "notifyOn" "NotifyOn" NOT NULL DEFAULT 'both',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "nextRunAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitorEvaluator" (
    "monitorId" INTEGER NOT NULL,
    "evaluatorId" INTEGER NOT NULL,

    CONSTRAINT "MonitorEvaluator_pkey" PRIMARY KEY ("monitorId","evaluatorId")
);

-- CreateTable
CREATE TABLE "MonitorPersonality" (
    "monitorId" INTEGER NOT NULL,
    "personalityId" INTEGER NOT NULL,

    CONSTRAINT "MonitorPersonality_pkey" PRIMARY KEY ("monitorId","personalityId")
);

-- CreateTable
CREATE TABLE "MonitorRun" (
    "id" SERIAL NOT NULL,
    "monitorId" INTEGER NOT NULL,
    "resultId" INTEGER,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "status" "MonitorRunStatus" NOT NULL DEFAULT 'queued',
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonitorRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personality" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER,
    "forkedFromId" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "prompt" TEXT NOT NULL DEFAULT '',
    "language" "Language" NOT NULL,
    "accent" TEXT,
    "gender" "Gender" NOT NULL DEFAULT 'neutral',
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "enabledByDefault" BOOLEAN NOT NULL DEFAULT true,
    "voiceModel" "VoiceModel",
    "voiceId" TEXT,
    "voiceVolume" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "interruptionLevel" "InterruptionLevel",
    "backgroundNoise" "BackgroundNoise" NOT NULL DEFAULT 'off',
    "backgroundNoiseUrl" TEXT,
    "backgroundSoundVolumeBase" DOUBLE PRECISION,
    "backgroundSoundVolumeReduced" DOUBLE PRECISION,
    "packetLossPercent" DOUBLE PRECISION,
    "jitterPercent" DOUBLE PRECISION,
    "latencyPercent" DOUBLE PRECISION,
    "idleTimeoutSeconds" INTEGER,
    "idleMessageMaxSpokenCount" INTEGER,
    "startSpeakingWaitSeconds" DOUBLE PRECISION,
    "stopSpeakingNumWords" INTEGER,
    "stopSpeakingVoiceSeconds" DOUBLE PRECISION,
    "stopSpeakingBackoffSeconds" DOUBLE PRECISION,
    "cartesiaVolume" DOUBLE PRECISION,
    "cartesiaEmotion" "CartesiaEmotion",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPersonality" (
    "projectId" INTEGER NOT NULL,
    "personalityId" INTEGER NOT NULL,

    CONSTRAINT "ProjectPersonality_pkey" PRIMARY KEY ("projectId","personalityId")
);

-- CreateTable
CREATE TABLE "BackgroundJob" (
    "id" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdById" INTEGER,
    "kind" "JobKind" NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'queued',
    "currentStep" TEXT,
    "input" JSONB NOT NULL,
    "result" JSONB,
    "error" TEXT,
    "dismissedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BackgroundJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoredFile" (
    "id" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoredFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderApiKey" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "provider" "ProviderKeyProvider" NOT NULL,
    "encryptedKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProviderApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectWebhook" (
    "projectId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "secretEncrypted" TEXT,
    "skipCallsWithoutContent" BOOLEAN NOT NULL DEFAULT false,
    "forwardVapiWebhooks" BOOLEAN NOT NULL DEFAULT true,
    "forwardRetellWebhooks" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectWebhook_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "ProjectWebhookNotification" (
    "projectId" INTEGER NOT NULL,
    "notification" "WebhookNotification" NOT NULL,

    CONSTRAINT "ProjectWebhookNotification_pkey" PRIMARY KEY ("projectId","notification")
);

-- CreateTable
CREATE TABLE "ProjectWebhookRedactionField" (
    "projectId" INTEGER NOT NULL,
    "field" "RedactionField" NOT NULL,

    CONSTRAINT "ProjectWebhookRedactionField_pkey" PRIMARY KEY ("projectId","field")
);

-- CreateTable
CREATE TABLE "ProjectKnowledgeVersion" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectKnowledgeVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShareLink" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "target" "ShareLinkTarget" NOT NULL,
    "resultId" INTEGER,
    "runId" INTEGER,
    "callLogId" INTEGER,
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShareLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "agentId" INTEGER,
    "agentVersionId" INTEGER,
    "name" TEXT NOT NULL DEFAULT '',
    "status" "RunStatus" NOT NULL DEFAULT 'pending',
    "createdVia" "ResultSource" NOT NULL DEFAULT 'user',
    "createdById" INTEGER,
    "apiKeyId" INTEGER,
    "frequency" INTEGER NOT NULL DEFAULT 1,
    "concurrencyLimit" INTEGER,
    "callsPerSecond" DOUBLE PRECISION,
    "callerNumberMode" "CallerNumberMode" NOT NULL DEFAULT 'same_number',
    "agentNumber" TEXT,
    "aiSummaryStatus" "AiSummaryStatus",
    "aiSummaryWhatHappened" TEXT,
    "aiSummaryWhyItHappened" TEXT,
    "aiSummaryHowToFix" TEXT,
    "aiSummaryGeneratedAt" TIMESTAMP(3),
    "pathCoverageGeneratedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultMockTool" (
    "resultId" INTEGER NOT NULL,
    "mockToolId" INTEGER NOT NULL,

    CONSTRAINT "ResultMockTool_pkey" PRIMARY KEY ("resultId","mockToolId")
);

-- CreateTable
CREATE TABLE "ResultNextStep" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ResultNextStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultWorkflowPath" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "covered" BOOLEAN NOT NULL,

    CONSTRAINT "ResultWorkflowPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultFailureReason" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ResultFailureReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultFailureReasonRun" (
    "failureReasonId" INTEGER NOT NULL,
    "runId" INTEGER NOT NULL,

    CONSTRAINT "ResultFailureReasonRun_pkey" PRIMARY KEY ("failureReasonId","runId")
);

-- CreateTable
CREATE TABLE "ResultMetricSummary" (
    "resultId" INTEGER NOT NULL,
    "metricId" INTEGER NOT NULL,
    "explanation" TEXT[],

    CONSTRAINT "ResultMetricSummary_pkey" PRIMARY KEY ("resultId","metricId")
);

-- CreateTable
CREATE TABLE "Run" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "evaluatorId" INTEGER,
    "personalityId" INTEGER,
    "testProfileId" INTEGER,
    "status" "RunStatus" NOT NULL DEFAULT 'pending',
    "evaluationStatus" "CallEvaluationStatus",
    "feedback" TEXT,
    "errorMessage" TEXT,
    "callerNumber" TEXT,
    "evaluatorSnapshot" JSONB NOT NULL,
    "testProfileSnapshot" JSONB,
    "outboundDialWindowOpensAt" TIMESTAMP(3),
    "outboundDialWindowClosesAt" TIMESTAMP(3),
    "executedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelephonyPhoneNumber" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "provider" "PhoneNumberProvider" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountSid" TEXT,
    "authTokenEncrypted" TEXT,
    "smsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "importedById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelephonyPhoneNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maxConcurrentRuns" INTEGER NOT NULL DEFAULT 10,
    "allowDuplicateCallIds" BOOLEAN NOT NULL DEFAULT true,
    "restrictNumbersToOwnImports" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMember" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'member',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "outboundTimeout" INTEGER NOT NULL DEFAULT 300,
    "maxCallDuration" INTEGER NOT NULL DEFAULT 600,
    "minCallDuration" INTEGER NOT NULL DEFAULT 10,
    "useProviderTranscript" BOOLEAN NOT NULL DEFAULT false,
    "notifyDailyReport" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timezone" "Timezone" NOT NULL DEFAULT 'UTC',
    "sampleRate" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "endCallEnabled" BOOLEAN NOT NULL DEFAULT true,
    "reconcileProviderTranscripts" BOOLEAN NOT NULL DEFAULT false,
    "deepResearchEnabled" BOOLEAN NOT NULL DEFAULT false,
    "emailNotificationsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "notifyMonitorFailure" BOOLEAN NOT NULL DEFAULT true,
    "notifyMonitorSuccess" BOOLEAN NOT NULL DEFAULT false,
    "notifyResultsCompletion" BOOLEAN NOT NULL DEFAULT false,
    "notifyDailyReportNoCalls" BOOLEAN NOT NULL DEFAULT false,
    "dailyReportAiSummaryEnabled" BOOLEAN NOT NULL DEFAULT false,
    "notifyNoCalls" BOOLEAN NOT NULL DEFAULT false,
    "notifyFrequentCalls" BOOLEAN NOT NULL DEFAULT false,
    "frequentCallsThreshold" INTEGER NOT NULL DEFAULT 5,
    "frequentCallsWindowSeconds" INTEGER NOT NULL DEFAULT 900,
    "frequentCallsCooldownSeconds" INTEGER NOT NULL DEFAULT 1200,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "projectId" INTEGER,
    "createdById" INTEGER,
    "name" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER,
    "eventType" "NotificationEventType" NOT NULL,
    "severity" "NotificationSeverity" NOT NULL DEFAULT 'success',
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "deepLink" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_defaultTestProfileId_key" ON "Agent"("defaultTestProfileId");

-- CreateIndex
CREATE INDEX "Agent_projectId_idx" ON "Agent"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "AgentVersion_agentId_version_key" ON "AgentVersion"("agentId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeBaseFile_fileId_key" ON "KnowledgeBaseFile"("fileId");

-- CreateIndex
CREATE INDEX "KnowledgeBaseFile_agentId_idx" ON "KnowledgeBaseFile"("agentId");

-- CreateIndex
CREATE INDEX "KnowledgeBaseConnector_agentId_idx" ON "KnowledgeBaseConnector"("agentId");

-- CreateIndex
CREATE UNIQUE INDEX "MockTool_agentId_name_key" ON "MockTool"("agentId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MockToolMapping_mockToolId_position_key" ON "MockToolMapping"("mockToolId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "DynamicVariable_agentId_name_key" ON "DynamicVariable"("agentId", "name");

-- CreateIndex
CREATE INDEX "AgentPersonality_personalityId_idx" ON "AgentPersonality"("personalityId");

-- CreateIndex
CREATE INDEX "AlertRule_metricId_idx" ON "AlertRule"("metricId");

-- CreateIndex
CREATE INDEX "AlertTrigger_alertRuleId_triggeredAt_idx" ON "AlertTrigger"("alertRuleId", "triggeredAt");

-- CreateIndex
CREATE INDEX "AlertTrigger_triggeredAt_idx" ON "AlertTrigger"("triggeredAt");

-- CreateIndex
CREATE UNIQUE INDEX "CallLog_conversationId_key" ON "CallLog"("conversationId");

-- CreateIndex
CREATE INDEX "CallLog_projectId_createdAt_idx" ON "CallLog"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "CallLog_projectId_externalCallId_idx" ON "CallLog"("projectId", "externalCallId");

-- CreateIndex
CREATE INDEX "CallLog_agentId_idx" ON "CallLog"("agentId");

-- CreateIndex
CREATE INDEX "Conversation_projectId_startedAt_idx" ON "Conversation"("projectId", "startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TranscriptTurn_conversationId_position_key" ON "TranscriptTurn"("conversationId", "position");

-- CreateIndex
CREATE INDEX "MetricEvaluation_metricId_createdAt_idx" ON "MetricEvaluation"("metricId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MetricEvaluation_conversationId_metricId_key" ON "MetricEvaluation"("conversationId", "metricId");

-- CreateIndex
CREATE INDEX "Dashboard_projectId_source_idx" ON "Dashboard"("projectId", "source");

-- CreateIndex
CREATE INDEX "Widget_dashboardId_sortPosition_idx" ON "Widget"("dashboardId", "sortPosition");

-- CreateIndex
CREATE INDEX "Widget_metricId_idx" ON "Widget"("metricId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedView_projectId_name_key" ON "SavedView"("projectId", "name");

-- CreateIndex
CREATE INDEX "SavedViewAgent_agentId_idx" ON "SavedViewAgent"("agentId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedViewAgent_savedViewId_agentId_agentVersionId_key" ON "SavedViewAgent"("savedViewId", "agentId", "agentVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "RunsOverviewConfiguration_projectId_name_key" ON "RunsOverviewConfiguration"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_projectId_path_key" ON "Folder"("projectId", "path");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_projectId_systemRole_key" ON "Folder"("projectId", "systemRole");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_projectId_name_key" ON "Tag"("projectId", "name");

-- CreateIndex
CREATE INDEX "TestProfile_projectId_idx" ON "TestProfile"("projectId");

-- CreateIndex
CREATE INDEX "TestProfile_agentId_idx" ON "TestProfile"("agentId");

-- CreateIndex
CREATE UNIQUE INDEX "TestProfileVariable_testProfileId_side_key_key" ON "TestProfileVariable"("testProfileId", "side", "key");

-- CreateIndex
CREATE INDEX "Evaluator_projectId_folderId_idx" ON "Evaluator"("projectId", "folderId");

-- CreateIndex
CREATE INDEX "Evaluator_agentId_idx" ON "Evaluator"("agentId");

-- CreateIndex
CREATE INDEX "Evaluator_personalityId_idx" ON "Evaluator"("personalityId");

-- CreateIndex
CREATE INDEX "Evaluator_testProfileId_idx" ON "Evaluator"("testProfileId");

-- CreateIndex
CREATE INDEX "EvaluatorTag_tagId_idx" ON "EvaluatorTag"("tagId");

-- CreateIndex
CREATE INDEX "EvaluatorMetric_metricId_idx" ON "EvaluatorMetric"("metricId");

-- CreateIndex
CREATE INDEX "EvaluatorExpectedToolCall_mockToolId_idx" ON "EvaluatorExpectedToolCall"("mockToolId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluatorExpectedToolCall_evaluatorId_position_key" ON "EvaluatorExpectedToolCall"("evaluatorId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluatorVersion_evaluatorId_version_key" ON "EvaluatorVersion"("evaluatorId", "version");

-- CreateIndex
CREATE INDEX "EvaluatorGenerationSession_projectId_createdAt_idx" ON "EvaluatorGenerationSession"("projectId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluatorGenerationMessage_sessionId_position_key" ON "EvaluatorGenerationMessage"("sessionId", "position");

-- CreateIndex
CREATE INDEX "FailureModeInsight_metricId_createdAt_idx" ON "FailureModeInsight"("metricId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FailureCategory_metricId_slug_key" ON "FailureCategory"("metricId", "slug");

-- CreateIndex
CREATE INDEX "FailureCategoryAssignment_categoryId_assignedAt_idx" ON "FailureCategoryAssignment"("categoryId", "assignedAt");

-- CreateIndex
CREATE UNIQUE INDEX "FailureModeInsightCategory_insightId_rank_key" ON "FailureModeInsightCategory"("insightId", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "LabTestSet_conversationId_key" ON "LabTestSet"("conversationId");

-- CreateIndex
CREATE INDEX "LabReview_metricId_idx" ON "LabReview"("metricId");

-- CreateIndex
CREATE UNIQUE INDEX "LabReview_testSetId_metricId_key" ON "LabReview"("testSetId", "metricId");

-- CreateIndex
CREATE UNIQUE INDEX "MetricPatternReview_optimizationSessionId_key" ON "MetricPatternReview"("optimizationSessionId");

-- CreateIndex
CREATE INDEX "MetricPatternReview_metricId_createdAt_idx" ON "MetricPatternReview"("metricId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PatternReviewGroup_representativeSampleId_key" ON "PatternReviewGroup"("representativeSampleId");

-- CreateIndex
CREATE UNIQUE INDEX "PatternReviewGroup_reviewId_key_key" ON "PatternReviewGroup"("reviewId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "PatternReviewEvidence_groupId_position_key" ON "PatternReviewEvidence"("groupId", "position");

-- CreateIndex
CREATE INDEX "PatternReviewSample_conversationId_idx" ON "PatternReviewSample"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "PatternReviewSample_groupId_conversationId_key" ON "PatternReviewSample"("groupId", "conversationId");

-- CreateIndex
CREATE INDEX "MetricOptimizationSession_metricId_createdAt_idx" ON "MetricOptimizationSession"("metricId", "createdAt");

-- CreateIndex
CREATE INDEX "OptimizationSessionTestSet_testSetId_idx" ON "OptimizationSessionTestSet"("testSetId");

-- CreateIndex
CREATE UNIQUE INDEX "MetricOptimizationProposal_sessionId_version_key" ON "MetricOptimizationProposal"("sessionId", "version");

-- CreateIndex
CREATE INDEX "ProposalReviewResult_labReviewId_idx" ON "ProposalReviewResult"("labReviewId");

-- CreateIndex
CREATE INDEX "MetricOptimizerSchedule_projectId_idx" ON "MetricOptimizerSchedule"("projectId");

-- CreateIndex
CREATE INDEX "MetricOptimizerSchedule_isActive_nextRunAt_idx" ON "MetricOptimizerSchedule"("isActive", "nextRunAt");

-- CreateIndex
CREATE UNIQUE INDEX "PredefinedMetric_code_key" ON "PredefinedMetric"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PredefinedMetric_slug_key" ON "PredefinedMetric"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PredefinedMetricEnumOption_predefinedMetricId_value_key" ON "PredefinedMetricEnumOption"("predefinedMetricId", "value");

-- CreateIndex
CREATE INDEX "Metric_projectId_displayOrder_idx" ON "Metric"("projectId", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Metric_projectId_slug_key" ON "Metric"("projectId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Metric_projectId_predefinedMetricId_key" ON "Metric"("projectId", "predefinedMetricId");

-- CreateIndex
CREATE UNIQUE INDEX "MetricEnumOption_metricId_value_key" ON "MetricEnumOption"("metricId", "value");

-- CreateIndex
CREATE INDEX "MetricAgent_agentId_idx" ON "MetricAgent"("agentId");

-- CreateIndex
CREATE INDEX "MetricDependency_dependsOnMetricId_idx" ON "MetricDependency"("dependsOnMetricId");

-- CreateIndex
CREATE UNIQUE INDEX "MetricVersion_metricId_version_key" ON "MetricVersion"("metricId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "RubricRule_metricId_key" ON "RubricRule"("metricId");

-- CreateIndex
CREATE INDEX "Monitor_projectId_idx" ON "Monitor"("projectId");

-- CreateIndex
CREATE INDEX "Monitor_agentId_idx" ON "Monitor"("agentId");

-- CreateIndex
CREATE INDEX "Monitor_isActive_nextRunAt_idx" ON "Monitor"("isActive", "nextRunAt");

-- CreateIndex
CREATE INDEX "MonitorEvaluator_evaluatorId_idx" ON "MonitorEvaluator"("evaluatorId");

-- CreateIndex
CREATE UNIQUE INDEX "MonitorRun_resultId_key" ON "MonitorRun"("resultId");

-- CreateIndex
CREATE INDEX "MonitorRun_status_idx" ON "MonitorRun"("status");

-- CreateIndex
CREATE UNIQUE INDEX "MonitorRun_monitorId_scheduledFor_key" ON "MonitorRun"("monitorId", "scheduledFor");

-- CreateIndex
CREATE INDEX "Personality_projectId_idx" ON "Personality"("projectId");

-- CreateIndex
CREATE INDEX "Personality_language_idx" ON "Personality"("language");

-- CreateIndex
CREATE INDEX "ProjectPersonality_personalityId_idx" ON "ProjectPersonality"("personalityId");

-- CreateIndex
CREATE INDEX "BackgroundJob_projectId_kind_createdAt_idx" ON "BackgroundJob"("projectId", "kind", "createdAt");

-- CreateIndex
CREATE INDEX "BackgroundJob_status_idx" ON "BackgroundJob"("status");

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_storageKey_key" ON "StoredFile"("storageKey");

-- CreateIndex
CREATE INDEX "StoredFile_projectId_idx" ON "StoredFile"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderApiKey_projectId_provider_key" ON "ProviderApiKey"("projectId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectKnowledgeVersion_projectId_version_key" ON "ProjectKnowledgeVersion"("projectId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ShareLink_token_key" ON "ShareLink"("token");

-- CreateIndex
CREATE INDEX "ShareLink_projectId_idx" ON "ShareLink"("projectId");

-- CreateIndex
CREATE INDEX "ShareLink_resultId_idx" ON "ShareLink"("resultId");

-- CreateIndex
CREATE INDEX "ShareLink_runId_idx" ON "ShareLink"("runId");

-- CreateIndex
CREATE INDEX "ShareLink_callLogId_idx" ON "ShareLink"("callLogId");

-- CreateIndex
CREATE INDEX "Result_projectId_createdAt_idx" ON "Result"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "Result_agentId_idx" ON "Result"("agentId");

-- CreateIndex
CREATE INDEX "Result_status_idx" ON "Result"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ResultNextStep_resultId_position_key" ON "ResultNextStep"("resultId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "ResultWorkflowPath_resultId_position_key" ON "ResultWorkflowPath"("resultId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "ResultFailureReason_resultId_rank_key" ON "ResultFailureReason"("resultId", "rank");

-- CreateIndex
CREATE INDEX "ResultFailureReasonRun_runId_idx" ON "ResultFailureReasonRun"("runId");

-- CreateIndex
CREATE INDEX "ResultMetricSummary_metricId_idx" ON "ResultMetricSummary"("metricId");

-- CreateIndex
CREATE UNIQUE INDEX "Run_conversationId_key" ON "Run"("conversationId");

-- CreateIndex
CREATE INDEX "Run_resultId_createdAt_idx" ON "Run"("resultId", "createdAt");

-- CreateIndex
CREATE INDEX "Run_evaluatorId_idx" ON "Run"("evaluatorId");

-- CreateIndex
CREATE INDEX "Run_personalityId_idx" ON "Run"("personalityId");

-- CreateIndex
CREATE INDEX "Run_status_idx" ON "Run"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TelephonyPhoneNumber_organizationId_phoneNumber_key" ON "TelephonyPhoneNumber"("organizationId", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "OrganizationMember_userId_idx" ON "OrganizationMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMember_organizationId_userId_key" ON "OrganizationMember"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "Project_organizationId_idx" ON "Project"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_keyHash_key" ON "ApiKey"("keyHash");

-- CreateIndex
CREATE INDEX "ApiKey_organizationId_idx" ON "ApiKey"("organizationId");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_idx" ON "Notification"("userId", "readAt");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_defaultTestProfileId_fkey" FOREIGN KEY ("defaultTestProfileId") REFERENCES "TestProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRedactionField" ADD CONSTRAINT "AgentRedactionField_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentVersion" ADD CONSTRAINT "AgentVersion_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentVersion" ADD CONSTRAINT "AgentVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBaseFile" ADD CONSTRAINT "KnowledgeBaseFile_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBaseFile" ADD CONSTRAINT "KnowledgeBaseFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "StoredFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBaseConnector" ADD CONSTRAINT "KnowledgeBaseConnector_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockTool" ADD CONSTRAINT "MockTool_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockToolMapping" ADD CONSTRAINT "MockToolMapping_mockToolId_fkey" FOREIGN KEY ("mockToolId") REFERENCES "MockTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DynamicVariable" ADD CONSTRAINT "DynamicVariable_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentPersonality" ADD CONSTRAINT "AgentPersonality_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentPersonality" ADD CONSTRAINT "AgentPersonality_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertRule" ADD CONSTRAINT "AlertRule_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertTrigger" ADD CONSTRAINT "AlertTrigger_alertRuleId_fkey" FOREIGN KEY ("alertRuleId") REFERENCES "AlertRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertTrigger" ADD CONSTRAINT "AlertTrigger_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertTrigger" ADD CONSTRAINT "AlertTrigger_metricEvaluationId_fkey" FOREIGN KEY ("metricEvaluationId") REFERENCES "MetricEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertTrigger" ADD CONSTRAINT "AlertTrigger_failureCategoryId_fkey" FOREIGN KEY ("failureCategoryId") REFERENCES "FailureCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_agentVersionId_fkey" FOREIGN KEY ("agentVersionId") REFERENCES "AgentVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_recordingFileId_fkey" FOREIGN KEY ("recordingFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptTurn" ADD CONSTRAINT "TranscriptTurn_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricEvaluation" ADD CONSTRAINT "MetricEvaluation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricEvaluation" ADD CONSTRAINT "MetricEvaluation_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedView" ADD CONSTRAINT "SavedView_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedViewAgent" ADD CONSTRAINT "SavedViewAgent_savedViewId_fkey" FOREIGN KEY ("savedViewId") REFERENCES "SavedView"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedViewAgent" ADD CONSTRAINT "SavedViewAgent_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedViewAgent" ADD CONSTRAINT "SavedViewAgent_agentVersionId_fkey" FOREIGN KEY ("agentVersionId") REFERENCES "AgentVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunsOverviewConfiguration" ADD CONSTRAINT "RunsOverviewConfiguration_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunsOverviewHiddenMetric" ADD CONSTRAINT "RunsOverviewHiddenMetric_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "RunsOverviewConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunsOverviewHiddenMetric" ADD CONSTRAINT "RunsOverviewHiddenMetric_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestProfile" ADD CONSTRAINT "TestProfile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestProfile" ADD CONSTRAINT "TestProfile_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestProfile" ADD CONSTRAINT "TestProfile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestProfile" ADD CONSTRAINT "TestProfile_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestProfileVariable" ADD CONSTRAINT "TestProfileVariable_testProfileId_fkey" FOREIGN KEY ("testProfileId") REFERENCES "TestProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "Personality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_testProfileId_fkey" FOREIGN KEY ("testProfileId") REFERENCES "TestProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_phoneNumberId_fkey" FOREIGN KEY ("phoneNumberId") REFERENCES "TelephonyPhoneNumber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_generationSessionId_fkey" FOREIGN KEY ("generationSessionId") REFERENCES "EvaluatorGenerationSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluator" ADD CONSTRAINT "Evaluator_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorTag" ADD CONSTRAINT "EvaluatorTag_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorTag" ADD CONSTRAINT "EvaluatorTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorTool" ADD CONSTRAINT "EvaluatorTool_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorMetric" ADD CONSTRAINT "EvaluatorMetric_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorMetric" ADD CONSTRAINT "EvaluatorMetric_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorExpectedToolCall" ADD CONSTRAINT "EvaluatorExpectedToolCall_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorExpectedToolCall" ADD CONSTRAINT "EvaluatorExpectedToolCall_mockToolId_fkey" FOREIGN KEY ("mockToolId") REFERENCES "MockTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorVersion" ADD CONSTRAINT "EvaluatorVersion_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorVersion" ADD CONSTRAINT "EvaluatorVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorGenerationSession" ADD CONSTRAINT "EvaluatorGenerationSession_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorGenerationSession" ADD CONSTRAINT "EvaluatorGenerationSession_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorGenerationSession" ADD CONSTRAINT "EvaluatorGenerationSession_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorGenerationMessage" ADD CONSTRAINT "EvaluatorGenerationMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "EvaluatorGenerationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricInsightConfig" ADD CONSTRAINT "MetricInsightConfig_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailureModeInsight" ADD CONSTRAINT "FailureModeInsight_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailureCategory" ADD CONSTRAINT "FailureCategory_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailureCategoryAssignment" ADD CONSTRAINT "FailureCategoryAssignment_metricEvaluationId_fkey" FOREIGN KEY ("metricEvaluationId") REFERENCES "MetricEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailureCategoryAssignment" ADD CONSTRAINT "FailureCategoryAssignment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FailureCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailureModeInsightCategory" ADD CONSTRAINT "FailureModeInsightCategory_insightId_fkey" FOREIGN KEY ("insightId") REFERENCES "FailureModeInsight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailureModeInsightCategory" ADD CONSTRAINT "FailureModeInsightCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FailureCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTestSet" ADD CONSTRAINT "LabTestSet_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabReview" ADD CONSTRAINT "LabReview_testSetId_fkey" FOREIGN KEY ("testSetId") REFERENCES "LabTestSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabReview" ADD CONSTRAINT "LabReview_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricPatternReview" ADD CONSTRAINT "MetricPatternReview_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricPatternReview" ADD CONSTRAINT "MetricPatternReview_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "BackgroundJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricPatternReview" ADD CONSTRAINT "MetricPatternReview_optimizationSessionId_fkey" FOREIGN KEY ("optimizationSessionId") REFERENCES "MetricOptimizationSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternReviewGroup" ADD CONSTRAINT "PatternReviewGroup_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "MetricPatternReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternReviewGroup" ADD CONSTRAINT "PatternReviewGroup_representativeSampleId_fkey" FOREIGN KEY ("representativeSampleId") REFERENCES "PatternReviewSample"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternReviewEvidence" ADD CONSTRAINT "PatternReviewEvidence_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PatternReviewGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternReviewSample" ADD CONSTRAINT "PatternReviewSample_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PatternReviewGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternReviewSample" ADD CONSTRAINT "PatternReviewSample_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricOptimizationSession" ADD CONSTRAINT "MetricOptimizationSession_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricOptimizationSession" ADD CONSTRAINT "MetricOptimizationSession_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "BackgroundJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricOptimizationSession" ADD CONSTRAINT "MetricOptimizationSession_appliedById_fkey" FOREIGN KEY ("appliedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricOptimizationSession" ADD CONSTRAINT "MetricOptimizationSession_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizationSessionTestSet" ADD CONSTRAINT "OptimizationSessionTestSet_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MetricOptimizationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizationSessionTestSet" ADD CONSTRAINT "OptimizationSessionTestSet_testSetId_fkey" FOREIGN KEY ("testSetId") REFERENCES "LabTestSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricOptimizationProposal" ADD CONSTRAINT "MetricOptimizationProposal_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MetricOptimizationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalReviewResult" ADD CONSTRAINT "ProposalReviewResult_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "MetricOptimizationProposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalReviewResult" ADD CONSTRAINT "ProposalReviewResult_labReviewId_fkey" FOREIGN KEY ("labReviewId") REFERENCES "LabReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricOptimizerSchedule" ADD CONSTRAINT "MetricOptimizerSchedule_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredefinedMetricEnumOption" ADD CONSTRAINT "PredefinedMetricEnumOption_predefinedMetricId_fkey" FOREIGN KEY ("predefinedMetricId") REFERENCES "PredefinedMetric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_predefinedMetricId_fkey" FOREIGN KEY ("predefinedMetricId") REFERENCES "PredefinedMetric"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricEnumOption" ADD CONSTRAINT "MetricEnumOption_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricAgent" ADD CONSTRAINT "MetricAgent_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricAgent" ADD CONSTRAINT "MetricAgent_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricDependency" ADD CONSTRAINT "MetricDependency_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricDependency" ADD CONSTRAINT "MetricDependency_dependsOnMetricId_fkey" FOREIGN KEY ("dependsOnMetricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricVersion" ADD CONSTRAINT "MetricVersion_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricVersion" ADD CONSTRAINT "MetricVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricRule" ADD CONSTRAINT "RubricRule_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorEvaluator" ADD CONSTRAINT "MonitorEvaluator_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorEvaluator" ADD CONSTRAINT "MonitorEvaluator_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorPersonality" ADD CONSTRAINT "MonitorPersonality_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorPersonality" ADD CONSTRAINT "MonitorPersonality_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorRun" ADD CONSTRAINT "MonitorRun_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorRun" ADD CONSTRAINT "MonitorRun_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_forkedFromId_fkey" FOREIGN KEY ("forkedFromId") REFERENCES "Personality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPersonality" ADD CONSTRAINT "ProjectPersonality_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPersonality" ADD CONSTRAINT "ProjectPersonality_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackgroundJob" ADD CONSTRAINT "BackgroundJob_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackgroundJob" ADD CONSTRAINT "BackgroundJob_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderApiKey" ADD CONSTRAINT "ProviderApiKey_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectWebhook" ADD CONSTRAINT "ProjectWebhook_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectWebhookNotification" ADD CONSTRAINT "ProjectWebhookNotification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectWebhook"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectWebhookRedactionField" ADD CONSTRAINT "ProjectWebhookRedactionField_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectWebhook"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectKnowledgeVersion" ADD CONSTRAINT "ProjectKnowledgeVersion_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectKnowledgeVersion" ADD CONSTRAINT "ProjectKnowledgeVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareLink" ADD CONSTRAINT "ShareLink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareLink" ADD CONSTRAINT "ShareLink_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareLink" ADD CONSTRAINT "ShareLink_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareLink" ADD CONSTRAINT "ShareLink_callLogId_fkey" FOREIGN KEY ("callLogId") REFERENCES "CallLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareLink" ADD CONSTRAINT "ShareLink_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_agentVersionId_fkey" FOREIGN KEY ("agentVersionId") REFERENCES "AgentVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultMockTool" ADD CONSTRAINT "ResultMockTool_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultMockTool" ADD CONSTRAINT "ResultMockTool_mockToolId_fkey" FOREIGN KEY ("mockToolId") REFERENCES "MockTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultNextStep" ADD CONSTRAINT "ResultNextStep_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultWorkflowPath" ADD CONSTRAINT "ResultWorkflowPath_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultFailureReason" ADD CONSTRAINT "ResultFailureReason_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultFailureReasonRun" ADD CONSTRAINT "ResultFailureReasonRun_failureReasonId_fkey" FOREIGN KEY ("failureReasonId") REFERENCES "ResultFailureReason"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultFailureReasonRun" ADD CONSTRAINT "ResultFailureReasonRun_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultMetricSummary" ADD CONSTRAINT "ResultMetricSummary_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultMetricSummary" ADD CONSTRAINT "ResultMetricSummary_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "Personality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_testProfileId_fkey" FOREIGN KEY ("testProfileId") REFERENCES "TestProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelephonyPhoneNumber" ADD CONSTRAINT "TelephonyPhoneNumber_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelephonyPhoneNumber" ADD CONSTRAINT "TelephonyPhoneNumber_importedById_fkey" FOREIGN KEY ("importedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE OR REPLACE FUNCTION "delete_owned_conversation"() RETURNS trigger AS $$
BEGIN
  DELETE FROM "Conversation" WHERE "id" = OLD."conversationId";
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "Run_delete_conversation"
AFTER DELETE ON "Run"
FOR EACH ROW EXECUTE FUNCTION "delete_owned_conversation"();

CREATE TRIGGER "CallLog_delete_conversation"
AFTER DELETE ON "CallLog"
FOR EACH ROW EXECUTE FUNCTION "delete_owned_conversation"();

ALTER TABLE "ShareLink" ADD CONSTRAINT "ShareLink_one_target_check" CHECK (
  ("target" = 'result' AND "resultId" IS NOT NULL AND "runId" IS NULL AND "callLogId" IS NULL)
  OR ("target" = 'run' AND "runId" IS NOT NULL AND "resultId" IS NULL AND "callLogId" IS NULL)
  OR ("target" = 'call_log' AND "callLogId" IS NOT NULL AND "resultId" IS NULL AND "runId" IS NULL)
);

ALTER TABLE "MetricEvaluation" ADD CONSTRAINT "MetricEvaluation_one_value_check"
  CHECK (num_nonnulls("valueNumber", "valueBoolean", "valueText") <= 1);
ALTER TABLE "LabReview" ADD CONSTRAINT "LabReview_one_expected_check"
  CHECK (num_nonnulls("expectedNumber", "expectedBoolean", "expectedText") <= 1);
ALTER TABLE "LabReview" ADD CONSTRAINT "LabReview_one_actual_check"
  CHECK (num_nonnulls("actualNumber", "actualBoolean", "actualText") <= 1);
ALTER TABLE "PatternReviewGroup" ADD CONSTRAINT "PatternReviewGroup_one_verdict_check"
  CHECK (num_nonnulls("verdictNumber", "verdictBoolean", "verdictText") <= 1);
ALTER TABLE "PatternReviewGroup" ADD CONSTRAINT "PatternReviewGroup_one_correction_check"
  CHECK (num_nonnulls("correctionNumber", "correctionBoolean", "correctionText") <= 1);
ALTER TABLE "PatternReviewSample" ADD CONSTRAINT "PatternReviewSample_one_verdict_check"
  CHECK (num_nonnulls("verdictNumber", "verdictBoolean", "verdictText") <= 1);
ALTER TABLE "ProposalReviewResult" ADD CONSTRAINT "ProposalReviewResult_one_actual_check"
  CHECK (num_nonnulls("actualNumber", "actualBoolean", "actualText") <= 1);
ALTER TABLE "RubricRule" ADD CONSTRAINT "RubricRule_one_value_check"
  CHECK (num_nonnulls("numberValue", "booleanValue") + (CASE WHEN cardinality("textValues") > 0 THEN 1 ELSE 0 END) <= 1);
ALTER TABLE "MetricInsightConfig" ADD CONSTRAINT "MetricInsightConfig_one_value_check"
  CHECK (num_nonnulls("passNumberValue", "passBooleanValue") + (CASE WHEN cardinality("passTextValues") > 0 THEN 1 ELSE 0 END) <= 1);
