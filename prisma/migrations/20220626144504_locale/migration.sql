-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT E'';
