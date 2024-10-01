/*
  Warnings:

  - The values [WebDevelopment,FullStack] on the enum `BlogTags` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlogTags_new" AS ENUM ('JavaScript', 'TypeScript', 'React', 'NodeJS', 'HTML', 'CSS', 'Web Development', 'Frontend', 'Backend', 'Full Stack');
ALTER TABLE "Blog" ALTER COLUMN "tags" TYPE "BlogTags_new"[] USING ("tags"::text::"BlogTags_new"[]);
ALTER TYPE "BlogTags" RENAME TO "BlogTags_old";
ALTER TYPE "BlogTags_new" RENAME TO "BlogTags";
DROP TYPE "BlogTags_old";
COMMIT;
