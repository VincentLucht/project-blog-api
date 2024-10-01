/*
  Warnings:

  - You are about to alter the column `summary` on the `Blog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "summary" SET DATA TYPE VARCHAR(150);
