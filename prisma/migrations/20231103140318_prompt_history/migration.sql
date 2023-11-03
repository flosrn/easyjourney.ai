-- CreateTable
CREATE TABLE "prompt_history" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "poster_id" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prompt_history" ADD CONSTRAINT "prompt_history_poster_id_fkey" FOREIGN KEY ("poster_id") REFERENCES "posters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_history" ADD CONSTRAINT "prompt_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
