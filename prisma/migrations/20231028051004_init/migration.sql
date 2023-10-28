-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_examName_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "examName" DROP NOT NULL;
