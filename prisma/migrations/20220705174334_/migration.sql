/*
  Warnings:

  - You are about to drop the column `date_end` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `date_start` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `reservationNumber` on the `TripTransport` table. All the data in the column will be lost.
  - Added the required column `dateEnd` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `TripTransport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEnd` to the `TripTransport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `TripTransport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `TripTransport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `TripTransport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueNumber` to the `TripTransport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TripTransport` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `TripTransport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "date_end",
DROP COLUMN "date_start",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TripAccomodation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TripTransport" DROP COLUMN "reservationNumber",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateEnd" TEXT NOT NULL,
ADD COLUMN     "dateStart" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL,
ADD COLUMN     "uniqueNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "TripPoll" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripPoll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripAnswer" (
    "id" TEXT NOT NULL,
    "tripPollId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TripAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripVote" (
    "id" TEXT NOT NULL,
    "tripAnswerId" TEXT NOT NULL,
    "tripUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripSee" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "tripLocationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TripSee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripHike" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "gpxFile" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripHike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripLocation" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TripLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripTicket" (
    "id" TEXT NOT NULL,
    "tripTransportId" TEXT NOT NULL,
    "tripUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "TripTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripPoll" ADD CONSTRAINT "TripPoll_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripAnswer" ADD CONSTRAINT "TripAnswer_tripPollId_fkey" FOREIGN KEY ("tripPollId") REFERENCES "TripPoll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripVote" ADD CONSTRAINT "TripVote_tripUserId_fkey" FOREIGN KEY ("tripUserId") REFERENCES "TripUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripVote" ADD CONSTRAINT "TripVote_tripAnswerId_fkey" FOREIGN KEY ("tripAnswerId") REFERENCES "TripAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripSee" ADD CONSTRAINT "TripSee_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripSee" ADD CONSTRAINT "TripSee_tripLocationId_fkey" FOREIGN KEY ("tripLocationId") REFERENCES "TripLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripHike" ADD CONSTRAINT "TripHike_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_tripTransportId_fkey" FOREIGN KEY ("tripTransportId") REFERENCES "TripTransport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_tripUserId_fkey" FOREIGN KEY ("tripUserId") REFERENCES "TripUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
