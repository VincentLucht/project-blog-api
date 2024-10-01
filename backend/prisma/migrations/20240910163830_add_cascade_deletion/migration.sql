-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_parent_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBlogs" DROP CONSTRAINT "UserBlogs_blog_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBlogs" DROP CONSTRAINT "UserBlogs_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserBlogs" ADD CONSTRAINT "UserBlogs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlogs" ADD CONSTRAINT "UserBlogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
