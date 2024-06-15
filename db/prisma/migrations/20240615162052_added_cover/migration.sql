-- CreateTable
CREATE TABLE "CoverImages" (
    "id" TEXT NOT NULL,
    "imageLink" TEXT,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoverImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoverImages" ADD CONSTRAINT "CoverImages_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
