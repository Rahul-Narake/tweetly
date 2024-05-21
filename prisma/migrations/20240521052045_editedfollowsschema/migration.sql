/*
  Warnings:

  - The primary key for the `Follows` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("id");
