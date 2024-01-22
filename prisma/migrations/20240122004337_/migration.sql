-- AlterTable
ALTER TABLE `Lesson` ADD COLUMN `vttTranscription` VARCHAR(191) NULL,
    MODIFY `isFree` BOOLEAN NULL DEFAULT false;
