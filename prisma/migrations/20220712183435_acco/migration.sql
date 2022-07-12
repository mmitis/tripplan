/*
  Warnings:

  - You are about to drop the `TripAccomodation` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TripAccommodationProvider" AS ENUM ('BOOKING');

-- DropForeignKey
ALTER TABLE "TripAccomodation" DROP CONSTRAINT "TripAccomodation_tripId_fkey";

-- DropTable
DROP TABLE "TripAccomodation";

-- DropEnum
DROP TYPE "TripAccomodationProvider";

-- CreateTable
CREATE TABLE "TripAccommodation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "TripAccommodationProvider" NOT NULL,
    "confirmationLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "coverPhoto" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "propertyLink" TEXT NOT NULL,
    "propertyPhone" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "tripId" TEXT NOT NULL,

    CONSTRAINT "TripAccommodation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripAccommodation" ADD CONSTRAINT "TripAccommodation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
