import { PrismaClient, Roles, ContentTypes, ContentBlock } from '@prisma/client';
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

  async createBlog(
    userId: string,
    title: string,
    summary: string,
    is_published: boolean,
    contentBlocks: { type: ContentTypes; content: string; order: number }[],
  ) {
    const blog = await prisma.blog.create({
      data: {
        title,
        summary,
        is_published,
        users: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
        content: {
          create: contentBlocks,
        },
      },
    });
    return blog;
  }

  async updateBlog(
    id: string,
    title: string,
    summary: string,
    is_published: boolean,
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
        content: {
          deleteMany: {},
          create: content.map(({ id, type, content, order }) => ({
            id,
            type,
            content,
            order,
          })),
        },
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
      include: {
        content: {
          orderBy: {
            order: 'asc',
          },
        },
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
        content: {
          orderBy: {
            order: 'asc',
          },
        },
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
    });
    return allBlogs;
  }

  async getAllBlogsFromUser(id: string) {
    const blogsFromUser = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        blogs: {
          include: {
            blog: true,
          },
        },
      },
    });
    return blogsFromUser;
  }

  async getBlogWithComments(blogId: string) {
    const blogWithComments = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        content: {
          orderBy: {
            order: 'asc',
          },
        },
        comments: {
          include: {
            user: {
              select: { id: true, name: true },
            },
            replies: {
              include: {
                user: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    });
    return blogWithComments;
  }

  async isInBlogAuthors(authorId: string, blogId: string) {
    const test = await prisma.userBlogs.findUnique({
      where: {
        blog_id_user_id: {
          blog_id: blogId,
          user_id: authorId,
        },
      },
    });

    return test;
  }
}

export const db = new DB();
