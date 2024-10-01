/*
  Warnings:

  - You are about to drop the column `content` on the `Blog` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContentTypes" AS ENUM ('text', 'image', 'header');

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "content";

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL,
    "type" "ContentTypes" NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentBlock_id_key" ON "ContentBlock"("id");

-- CreateIndex
CREATE INDEX "ContentBlock_blogId_idx" ON "ContentBlock"("blogId");

-- AddForeignKey
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
