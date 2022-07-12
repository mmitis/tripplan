/*
  Warnings:

  - Added the required column `type` to the `TripPoll` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripPollType" AS ENUM ('MULTISELECT', 'SINGLESELECT');

-- AlterTable
ALTER TABLE "TripPoll" ADD COLUMN     "type" "TripPollType" NOT NULL;

-- CreateTable
CREATE TABLE "TripMap" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "TripMap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripMap" ADD CONSTRAINT "TripMap_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
