/*
  Warnings:

  - You are about to drop the column `imageSrc` on the `posters` table. All the data in the column will be lost.
  - Added the required column `image` to the `posters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posters" DROP COLUMN "imageSrc",
ADD COLUMN     "image" TEXT NOT NULL;
