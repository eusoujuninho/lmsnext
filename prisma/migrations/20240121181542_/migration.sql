/*
  Warnings:

  - You are about to drop the column `language` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `LessonTranscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Lesson` DROP COLUMN `language`,
    ADD COLUMN `jsonTranscription` VARCHAR(191) NULL,
    ADD COLUMN `videoHtml` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `LessonTranscription`;
