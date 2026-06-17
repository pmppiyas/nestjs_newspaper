/*
  Warnings:

  - You are about to drop the column `categoryId` on the `news` table. All the data in the column will be lost.
  - Added the required column `categorySlug` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_categoryId_fkey";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "categoryId",
ADD COLUMN     "categorySlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "categories"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
