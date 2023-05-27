-- AlterTable
ALTER TABLE "posters" ADD COLUMN     "discord_image_url" TEXT,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "job_id" TEXT,
ADD COLUMN     "mj_image_url" TEXT;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board_posters" (
    "board_id" TEXT NOT NULL,
    "poster_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "board_posters_pkey" PRIMARY KEY ("board_id","poster_id")
);

-- CreateTable
CREATE TABLE "boards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToPoster" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPoster_AB_unique" ON "_CategoryToPoster"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPoster_B_index" ON "_CategoryToPoster"("B");

-- AddForeignKey
ALTER TABLE "board_posters" ADD CONSTRAINT "board_posters_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_posters" ADD CONSTRAINT "board_posters_poster_id_fkey" FOREIGN KEY ("poster_id") REFERENCES "posters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPoster" ADD CONSTRAINT "_CategoryToPoster_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPoster" ADD CONSTRAINT "_CategoryToPoster_B_fkey" FOREIGN KEY ("B") REFERENCES "posters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
