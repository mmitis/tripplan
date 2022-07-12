/*
  Warnings:

  - Added the required column `description` to the `TripPoll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripPoll" ADD COLUMN     "description" TEXT NOT NULL;
