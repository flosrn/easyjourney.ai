/*
  Warnings:

  - You are about to drop the `ArtWork` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtWork" DROP CONSTRAINT "ArtWork_userId_fkey";

-- DropTable
DROP TABLE "ArtWork";

-- CreateTable
CREATE TABLE "PosterProduct" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "likes" INTEGER,
    "userId" TEXT,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PosterProduct" ADD CONSTRAINT "Poster_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
