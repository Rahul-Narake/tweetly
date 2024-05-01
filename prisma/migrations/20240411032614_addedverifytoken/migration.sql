/*
  Warnings:

  - Added the required column `verifyToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyToken" TEXT NOT NULL,
ADD COLUMN     "verifyTokenExpiry" TIMESTAMP(3) NOT NULL;
