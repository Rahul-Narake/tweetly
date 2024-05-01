/*
  Warnings:

  - You are about to drop the `Dob` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dob" DROP CONSTRAINT "Dob_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Dob";
