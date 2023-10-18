-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_examId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "examName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
