/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - Made the column `publishedAt` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "publishedAt" SET NOT NULL,
ALTER COLUMN "publishedAt" SET DEFAULT CURRENT_TIMESTAMP;
