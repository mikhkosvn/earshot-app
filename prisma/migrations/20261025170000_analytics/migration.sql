-- CreateEnum
CREATE TYPE "EvaluationConsumer" AS ENUM ('alerts', 'insight_triage');

-- CreateEnum
CREATE TYPE "ObservabilityNotificationKind" AS ENUM ('no_calls', 'frequent_calls');

-- CreateEnum
CREATE TYPE "DeepResearchStatus" AS ENUM ('pending', 'running', 'succeeded', 'failed', 'skipped_not_enough_data');

-- CreateEnum
CREATE TYPE "DeepResearchTrigger" AS ENUM ('weekly', 'on_demand');

-- CreateTable
CREATE TABLE "EvaluationCursor" (
    "consumer" "EvaluationConsumer" NOT NULL,
    "lastEvaluationId" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluationCursor_pkey" PRIMARY KEY ("consumer")
);

-- CreateTable
CREATE TABLE "ObservabilityNotificationLog" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "kind" "ObservabilityNotificationKind" NOT NULL,
    "customerNumber" TEXT,
    "callCount" INTEGER NOT NULL DEFAULT 0,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservabilityNotificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyReportDelivery" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "reportDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyReportDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeepResearchInsight" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "trigger" "DeepResearchTrigger" NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "numCallsAnalyzed" INTEGER NOT NULL DEFAULT 0,
    "status" "DeepResearchStatus" NOT NULL DEFAULT 'pending',
    "headline" TEXT,
    "errorMessage" TEXT,
    "durationSeconds" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeepResearchInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeepResearchFailureMode" (
    "id" SERIAL NOT NULL,
    "insightId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "callCount" INTEGER NOT NULL DEFAULT 0,
    "exampleCallLogIds" INTEGER[],
    "dismissedAt" TIMESTAMP(3),

    CONSTRAINT "DeepResearchFailureMode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ObservabilityNotificationLog_projectId_kind_sentAt_idx" ON "ObservabilityNotificationLog"("projectId", "kind", "sentAt");

-- CreateIndex
CREATE UNIQUE INDEX "DailyReportDelivery_projectId_reportDate_key" ON "DailyReportDelivery"("projectId", "reportDate");

-- CreateIndex
CREATE INDEX "DeepResearchInsight_projectId_createdAt_idx" ON "DeepResearchInsight"("projectId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DeepResearchFailureMode_insightId_rank_key" ON "DeepResearchFailureMode"("insightId", "rank");

-- AddForeignKey
ALTER TABLE "ObservabilityNotificationLog" ADD CONSTRAINT "ObservabilityNotificationLog_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDelivery" ADD CONSTRAINT "DailyReportDelivery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeepResearchInsight" ADD CONSTRAINT "DeepResearchInsight_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeepResearchFailureMode" ADD CONSTRAINT "DeepResearchFailureMode_insightId_fkey" FOREIGN KEY ("insightId") REFERENCES "DeepResearchInsight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

