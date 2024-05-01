-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verificationCode" DROP NOT NULL,
ALTER COLUMN "verificationCodeExpiry" DROP NOT NULL;
