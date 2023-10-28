/*
  Warnings:

  - Made the column `examName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "examName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_examName_fkey" FOREIGN KEY ("examName") REFERENCES "Exam"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
