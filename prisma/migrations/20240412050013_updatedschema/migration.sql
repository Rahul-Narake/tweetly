/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `verificationCode` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verificationCodeExpiry` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT,
ALTER COLUMN "verificationCode" SET NOT NULL,
ALTER COLUMN "verificationCodeExpiry" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
