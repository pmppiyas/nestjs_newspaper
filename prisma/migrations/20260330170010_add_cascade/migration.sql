-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_newsId_fkey";

-- DropForeignKey
ALTER TABLE "reading_histories" DROP CONSTRAINT "reading_histories_newsId_fkey";

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_histories" ADD CONSTRAINT "reading_histories_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;
