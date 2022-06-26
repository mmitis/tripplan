/*
  Warnings:

  - You are about to drop the column `bookingLink` on the `TripAccomodation` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `TripAccomodation` table. All the data in the column will be lost.
  - You are about to drop the `TripAttachedPeople` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `confirmationLink` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPhoto` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEnd` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyAddress` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyLink` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyName` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `TripAccomodation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripUserRole" AS ENUM ('CREATOR', 'USER', 'VIEWER');

-- CreateEnum
CREATE TYPE "TripUserType" AS ENUM ('COMMON', 'INVITE');

-- CreateEnum
CREATE TYPE "TripAccomodationProvider" AS ENUM ('BOOKING');

-- DropForeignKey
ALTER TABLE "TripAttachedPeople" DROP CONSTRAINT "TripAttachedPeople_tripId_fkey";

-- DropForeignKey
ALTER TABLE "TripAttachedPeople" DROP CONSTRAINT "TripAttachedPeople_userId_fkey";

-- AlterTable
ALTER TABLE "TripAccomodation" DROP COLUMN "bookingLink",
DROP COLUMN "date",
ADD COLUMN     "confirmationLink" TEXT NOT NULL,
ADD COLUMN     "coverPhoto" TEXT NOT NULL,
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "propertyAddress" TEXT NOT NULL,
ADD COLUMN     "propertyLink" TEXT NOT NULL,
ADD COLUMN     "propertyName" TEXT NOT NULL,
ADD COLUMN     "provider" "TripAccomodationProvider" NOT NULL;

-- DropTable
DROP TABLE "TripAttachedPeople";

-- CreateTable
CREATE TABLE "TripUser" (
    "id" TEXT NOT NULL,
    "role" "TripUserRole" NOT NULL,
    "userType" "TripUserType" NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT,

    CONSTRAINT "TripUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripUser" ADD CONSTRAINT "TripUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripUser" ADD CONSTRAINT "TripUser_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
