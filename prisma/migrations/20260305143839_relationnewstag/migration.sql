/*
  Warnings:

  - You are about to drop the `_NewsTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NewsTags" DROP CONSTRAINT "_NewsTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsTags" DROP CONSTRAINT "_NewsTags_B_fkey";

-- DropTable
DROP TABLE "_NewsTags";

-- CreateTable
CREATE TABLE "_newsTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_newsTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_newsTags_B_index" ON "_newsTags"("B");

-- AddForeignKey
ALTER TABLE "_newsTags" ADD CONSTRAINT "_newsTags_A_fkey" FOREIGN KEY ("A") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_newsTags" ADD CONSTRAINT "_newsTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
