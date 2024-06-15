/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_articleId_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Tasveer" (
    "id" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tasveer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasveer" ADD CONSTRAINT "Tasveer_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
