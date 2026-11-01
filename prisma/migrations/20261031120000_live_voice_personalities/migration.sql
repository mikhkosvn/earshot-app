CREATE TYPE "LiveVoice" AS ENUM ('marin', 'quartz', 'ripple', 'vesper', 'willow', 'stone', 'gleam', 'meridian', 'bossa', 'tempo', 'beacon', 'delta', 'cinder', 'nuri', 'juni', 'flitz', 'brise', 'sillage', 'nira', 'harema', 'shida', 'noeul');

ALTER TABLE "Personality" ADD COLUMN "voice" "LiveVoice" NOT NULL DEFAULT 'marin';

UPDATE "Personality" SET "accent" = NULL, "gender" = 'neutral';

ALTER TABLE "Project" ADD COLUMN "defaultPersonalityId" INTEGER;

CREATE UNIQUE INDEX "Project_defaultPersonalityId_key" ON "Project"("defaultPersonalityId");

ALTER TABLE "Project" ADD CONSTRAINT "Project_defaultPersonalityId_fkey" FOREIGN KEY ("defaultPersonalityId") REFERENCES "Personality"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

WITH "created" AS (
  INSERT INTO "Personality" ("projectId", "name", "description", "prompt", "language", "voice", "gender", "isStarred", "enabledByDefault", "createdAt", "updatedAt")
  SELECT "id", 'Default caller', '', 'You are a calm, polite adult who calls a business by phone. You speak in short, natural sentences. You give one piece of information at a time. You wait for the agent to finish before you answer.', 'en', 'marin', 'neutral', false, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  FROM "Project"
  RETURNING "id", "projectId"
)
UPDATE "Project" SET "defaultPersonalityId" = "created"."id"
FROM "created"
WHERE "created"."projectId" = "Project"."id";

INSERT INTO "ProjectPersonality" ("projectId", "personalityId")
SELECT "id", "defaultPersonalityId" FROM "Project"
ON CONFLICT DO NOTHING;

UPDATE "Evaluator" SET "personalityId" = "Project"."defaultPersonalityId"
FROM "Project"
WHERE "Evaluator"."projectId" = "Project"."id"
  AND ("Evaluator"."personalityId" IS NULL
    OR "Evaluator"."personalityId" IN (SELECT "id" FROM "Personality" WHERE "projectId" IS NULL));

INSERT INTO "AgentPersonality" ("agentId", "personalityId")
SELECT "Agent"."id", "Project"."defaultPersonalityId"
FROM "Agent"
JOIN "Project" ON "Project"."id" = "Agent"."projectId"
ON CONFLICT DO NOTHING;

INSERT INTO "MonitorPersonality" ("monitorId", "personalityId")
SELECT DISTINCT "Monitor"."id", "Project"."defaultPersonalityId"
FROM "MonitorPersonality"
JOIN "Monitor" ON "Monitor"."id" = "MonitorPersonality"."monitorId"
JOIN "Project" ON "Project"."id" = "Monitor"."projectId"
WHERE "MonitorPersonality"."personalityId" IN (SELECT "id" FROM "Personality" WHERE "projectId" IS NULL)
ON CONFLICT DO NOTHING;

DELETE FROM "StoredFile" WHERE "id" IN (SELECT "sampleFileId" FROM "ClonedVoice");

DELETE FROM "Personality" WHERE "projectId" IS NULL;

ALTER TABLE "ClonedVoice" DROP CONSTRAINT "ClonedVoice_sampleFileId_fkey";

DROP TABLE "ClonedVoice";

ALTER TABLE "Personality" DROP COLUMN "backgroundNoise",
DROP COLUMN "backgroundNoiseUrl",
DROP COLUMN "backgroundSoundVolumeBase",
DROP COLUMN "backgroundSoundVolumeReduced",
DROP COLUMN "cartesiaEmotion",
DROP COLUMN "cartesiaVolume",
DROP COLUMN "idleMessageMaxSpokenCount",
DROP COLUMN "idleTimeoutSeconds",
DROP COLUMN "interruptionLevel",
DROP COLUMN "jitterPercent",
DROP COLUMN "latencyPercent",
DROP COLUMN "packetLossPercent",
DROP COLUMN "speed",
DROP COLUMN "startSpeakingWaitSeconds",
DROP COLUMN "stopSpeakingBackoffSeconds",
DROP COLUMN "stopSpeakingNumWords",
DROP COLUMN "stopSpeakingVoiceSeconds",
DROP COLUMN "voiceId",
DROP COLUMN "voiceModel",
DROP COLUMN "voiceVolume";

DROP TYPE "BackgroundNoise";

DROP TYPE "CartesiaEmotion";

DROP TYPE "InterruptionLevel";

DROP TYPE "VoiceModel";
