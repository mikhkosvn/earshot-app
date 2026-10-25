-- CreateEnum
CREATE TYPE "TeamSize" AS ENUM ('1', '<10', '10-100', '100-500', '500+');

-- AlterEnum
ALTER TYPE "NotificationEventType" ADD VALUE 'scenario_agent_question';

-- AlterTable
ALTER TABLE "EvaluatorGenerationSession" ADD COLUMN     "options" JSONB;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "teamSize" "TeamSize";

-- CreateTable
CREATE TABLE "ClonedVoice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sampleFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClonedVoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClonedVoice_sampleFileId_key" ON "ClonedVoice"("sampleFileId");

-- AddForeignKey
ALTER TABLE "ClonedVoice" ADD CONSTRAINT "ClonedVoice_sampleFileId_fkey" FOREIGN KEY ("sampleFileId") REFERENCES "StoredFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
