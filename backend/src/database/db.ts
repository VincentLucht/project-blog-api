import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

enum Roles {
  BASIC = 'BASIC',
  AUTHOR = 'AUTHOR',
}

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
    content: string,
    is_published: boolean,
  ) {
    // insert the user and use "connect" to create the relationship
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        is_published,
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
    const allBlogs = await prisma.blog.findMany();
    return allBlogs;
  }

  async getBlogWithComments(blogId: string) {
    const blogWithComments = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        comments: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return blogWithComments;
  }
}

export const db = new DB();
