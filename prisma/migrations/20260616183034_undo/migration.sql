/*
  Warnings:

  - Added the required column `categoryId` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_categorySlug_fkey";

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
