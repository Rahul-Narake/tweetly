/*
  Warnings:

  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyTokenExpiry` on the `User` table. All the data in the column will be lost.
  - Added the required column `verificationCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationCodeExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifyToken",
DROP COLUMN "verifyTokenExpiry",
ADD COLUMN     "verificationCode" TEXT NOT NULL,
ADD COLUMN     "verificationCodeExpiry" TIMESTAMP(3) NOT NULL;
