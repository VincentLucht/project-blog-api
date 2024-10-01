-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('BASIC', 'AUTHOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Roles" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "content" VARCHAR(50000) NOT NULL,
    "posted_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBlogs" (
    "id" SERIAL NOT NULL,
    "blog_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserBlogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "text" VARCHAR(500) NOT NULL,
    "posted_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_comment_id" TEXT,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_id_key" ON "Blog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBlogs_id_key" ON "UserBlogs"("id");

-- CreateIndex
CREATE INDEX "UserBlogs_blog_id_idx" ON "UserBlogs"("blog_id");

-- CreateIndex
CREATE INDEX "UserBlogs_user_id_idx" ON "UserBlogs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBlogs_blog_id_user_id_key" ON "UserBlogs"("blog_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_key" ON "Comments"("id");

-- CreateIndex
CREATE INDEX "Comments_userId_idx" ON "Comments"("userId");

-- CreateIndex
CREATE INDEX "Comments_blogId_idx" ON "Comments"("blogId");

-- CreateIndex
CREATE INDEX "Comments_parent_comment_id_idx" ON "Comments"("parent_comment_id");

-- AddForeignKey
ALTER TABLE "UserBlogs" ADD CONSTRAINT "UserBlogs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlogs" ADD CONSTRAINT "UserBlogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
