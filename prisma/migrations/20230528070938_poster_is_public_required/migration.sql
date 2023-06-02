/*
  Warnings:

  - Made the column `is_public` on table `posters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posters" ALTER COLUMN "is_public" SET NOT NULL;
