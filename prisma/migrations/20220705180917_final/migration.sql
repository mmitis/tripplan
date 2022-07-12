/*
  Warnings:

  - Changed the type of `dateEnd` on the `TripTransport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dateStart` on the `TripTransport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TripTransport" ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
DROP COLUMN "dateEnd",
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dateStart",
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
