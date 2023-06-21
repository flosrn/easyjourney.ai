/*
  Warnings:

  - Made the column `credits` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `freeCredits` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "credits" SET NOT NULL,
ALTER COLUMN "credits" SET DEFAULT 5,
ALTER COLUMN "freeCredits" SET NOT NULL,
ALTER COLUMN "freeCredits" SET DEFAULT 10;
