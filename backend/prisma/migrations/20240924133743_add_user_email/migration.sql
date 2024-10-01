/*
  Warnings:

  - You are about to drop the column `type` on the `ContentBlock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContentBlock" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ContentTypes";
