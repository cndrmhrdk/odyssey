/*
  Warnings:

  - Made the column `choiceA` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `choiceB` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `choiceC` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `choiceD` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correctChoice` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `question` on table `Quest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "choiceA" SET NOT NULL,
ALTER COLUMN "choiceB" SET NOT NULL,
ALTER COLUMN "choiceC" SET NOT NULL,
ALTER COLUMN "choiceD" SET NOT NULL,
ALTER COLUMN "correctChoice" SET NOT NULL,
ALTER COLUMN "question" SET NOT NULL;
