-- CreateEnum
CREATE TYPE "BlogTags" AS ENUM ('JavaScript', 'TypeScript', 'React', 'NodeJS', 'HTML', 'CSS', 'WebDevelopment', 'Frontend', 'Backend', 'FullStack');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "tags" "BlogTags"[];
