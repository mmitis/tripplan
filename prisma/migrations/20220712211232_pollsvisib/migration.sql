-- AlterTable
ALTER TABLE "TripPoll" ADD COLUMN     "visibility" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "TripPollAnswer" ADD COLUMN     "description" TEXT;
