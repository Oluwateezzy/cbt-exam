/*
  Warnings:

  - You are about to drop the column `courses` on the `User` table. All the data in the column will be lost.
  - Made the column `point` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "totalScore" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "point" SET NOT NULL,
ALTER COLUMN "point" SET DEFAULT 10;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "courses",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_Enrollments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Enrollments_AB_unique" ON "_Enrollments"("A", "B");

-- CreateIndex
CREATE INDEX "_Enrollments_B_index" ON "_Enrollments"("B");

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
