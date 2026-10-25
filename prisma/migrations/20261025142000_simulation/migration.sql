-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "copiedFromId" INTEGER;

-- CreateIndex
CREATE INDEX "Conversation_copiedFromId_idx" ON "Conversation"("copiedFromId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_copiedFromId_fkey" FOREIGN KEY ("copiedFromId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

