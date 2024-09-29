import { PrismaClient, Roles, ContentBlock, BlogTags } from '@prisma/client';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();

class DB {
  async createUser(name: string, password: string, role: Roles) {
    await prisma.user.create({
      data: {
        name,
        password,
        role,
      },
    });
  }

  async createBlog(userId: string) {
    const blog = await prisma.blog.create({
      data: {
        title: 'Untitled',
        summary: '',
        content: {
          create: {
            content: 'Just created this Blog!',
            id: randomUUID(),
            order: 0,
          },
        },
        is_published: false,
        users: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
      },
    });

    return blog;
  }

  async searchBlog(title: string) {
    const blogs = await prisma.blog.findMany({
      where: {
        is_published: true,
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });

    return blogs;
  }

  async updateBlog(
    id: string,
    title: string,
    summary: string,
    is_published: boolean,
    tags: BlogTags[],
    updated_at: string,
    content: ContentBlock[],
  ) {
    await prisma.blog.update({
      where: { id },
      data: {
        title,
        summary,
        is_published,
        updated_at,
        tags,
        content: {
          deleteMany: {},
          create: content.map(({ id, content, order }) => ({
            id,
            content,
            order,
          })),
        },
      },
    });
  }

  async deleteBlog(id: string) {
    await prisma.blog.delete({
      where: {
        id,
      },
    });
  }

  async getAllUsers() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async getAllBlogs() {
    const allBlogs = await prisma.blog.findMany({
      where: {
        is_published: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
    return allBlogs;
  }

  async getAllBlogsWithUser() {
    const allBlogs = await prisma.blog.findMany({
      where: {
        is_published: true,
      },
      select: {
        id: true,
        title: true,
        summary: true,
        posted_on: true,
        updated_at: true,
        tags: true,
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
    return allBlogs;
  }

  async getAllBlogsFromUser(id: string) {
    const blogsFromUser = await prisma.user.findUnique({
      where: { id },
      select: {
        blogs: {
          select: {
            blog: {
              select: {
                id: true,
                title: true,
                summary: true,
                updated_at: true,
                tags: true,
              },
            },
          },
          orderBy: {
            blog: {
              updated_at: 'desc',
            },
          },
        },
      },
    });

    const flattenedBlogs = blogsFromUser?.blogs.map(({ blog }) => blog) ?? [];
    return flattenedBlogs;
  }

  async getBlogWithUser(blogId: string) {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        users: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        content: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return blog;
  }

  async getBlogComments(blogId: string) {
    const blogComments = await prisma.comments.findMany({
      where: {
        blogId,
      },
      orderBy: {
        posted_on: 'desc',
      },
      include: {
        user: {
          select: { id: true, name: true },
        },
        replies: {
          include: {
            user: { select: { id: true, name: true } },
          },
          orderBy: {
            posted_on: 'asc',
          },
        },
      },
    });

    return blogComments;
  }

  async isInBlogAuthors(authorId: string, blogId: string) {
    const result = await prisma.userBlogs.findUnique({
      where: {
        blog_id_user_id: {
          blog_id: blogId,
          user_id: authorId,
        },
      },
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async addComment(userId: string, blogId: string, text: string) {
    await prisma.comments.create({
      data: {
        userId,
        blogId,
        text,
      },
    });
  }

  async replyToComment(blogId: string, text: string, parent_comment_id: string, userId: string, repliedToName: string) {
    await prisma.comments.create({
      data: {
        blogId,
        text,
        parent_comment_id,
        repliedToName,
        userId,
      },
    });
  }

  async getComment(commentId: string) {
    await prisma.comments.findUnique({
      where: {
        id: commentId,
      },
    });
  }
}

export const db = new DB();
