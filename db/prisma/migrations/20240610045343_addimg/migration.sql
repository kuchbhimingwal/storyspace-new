/*
  Warnings:

  - Added the required column `imageLink` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "imageLink" TEXT NOT NULL;
