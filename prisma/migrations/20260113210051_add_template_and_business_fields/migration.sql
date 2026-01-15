/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Added the required column `businessName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loyverseKeyHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `businessName` VARCHAR(191) NOT NULL,
    ADD COLUMN `loyverseKeyHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `primaryColor` VARCHAR(191) NOT NULL DEFAULT '#000000',
    ADD COLUMN `templateType` ENUM('TEMPLATE_1', 'TEMPLATE_2') NOT NULL DEFAULT 'TEMPLATE_1',
    MODIFY `role` ENUM('ADMIN', 'BUSINESS') NOT NULL DEFAULT 'BUSINESS';
