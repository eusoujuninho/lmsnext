/*
  Warnings:

  - A unique constraint covering the columns `[lessonId]` on the table `MuxData` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `MuxData` ADD COLUMN `lessonId` VARCHAR(191) NULL,
    MODIFY `chapterId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MuxData_lessonId_key` ON `MuxData`(`lessonId`);
