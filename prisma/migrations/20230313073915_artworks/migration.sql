-- CreateTable
CREATE TABLE "ArtWork" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "likes" INTEGER,
    "userId" TEXT,

    CONSTRAINT "ArtWork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtWork" ADD CONSTRAINT "ArtWork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
