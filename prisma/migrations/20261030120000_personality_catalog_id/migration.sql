ALTER TABLE "Personality" ADD COLUMN "catalogId" INTEGER;

CREATE UNIQUE INDEX "Personality_catalogId_key" ON "Personality"("catalogId");
