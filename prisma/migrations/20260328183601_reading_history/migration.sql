-- CreateTable
CREATE TABLE "reading_histories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reading_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reading_histories_userId_newsId_key" ON "reading_histories"("userId", "newsId");

-- AddForeignKey
ALTER TABLE "reading_histories" ADD CONSTRAINT "reading_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_histories" ADD CONSTRAINT "reading_histories_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
