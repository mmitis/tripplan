/*
  Warnings:

  - You are about to drop the column `propertyName` on the `TripAccomodation` table. All the data in the column will be lost.
  - Added the required column `propertyPhone` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `TripAccomodation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TripTransportType" AS ENUM ('BUS', 'PLANE');

-- CreateEnum
CREATE TYPE "TripTransportProvider" AS ENUM ('WIZZAIR', 'RYANAIR', 'LOCAL_TRAIN', 'LOCAL_BUS');

-- AlterTable
ALTER TABLE "TripAccomodation" DROP COLUMN "propertyName",
ADD COLUMN     "propertyPhone" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TripTransport" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "type" "TripTransportType" NOT NULL,
    "provider" "TripTransportProvider" NOT NULL,
    "reservationNumber" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "TripTransport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripTransport" ADD CONSTRAINT "TripTransport_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
