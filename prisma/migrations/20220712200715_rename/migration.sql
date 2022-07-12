/*
  Warnings:

  - You are about to drop the `TripAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TripAnswer" DROP CONSTRAINT "TripAnswer_tripPollId_fkey";

-- DropForeignKey
ALTER TABLE "TripVote" DROP CONSTRAINT "TripVote_tripAnswerId_fkey";

-- DropTable
DROP TABLE "TripAnswer";

-- CreateTable
CREATE TABLE "TripPollAnswer" (
    "id" TEXT NOT NULL,
    "tripPollId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TripPollAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripPollAnswer" ADD CONSTRAINT "TripPollAnswer_tripPollId_fkey" FOREIGN KEY ("tripPollId") REFERENCES "TripPoll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripVote" ADD CONSTRAINT "TripVote_tripAnswerId_fkey" FOREIGN KEY ("tripAnswerId") REFERENCES "TripPollAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
