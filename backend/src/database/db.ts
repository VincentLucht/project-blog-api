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
    blogId: string,
    userId: string,
    title: string,
    is_published: boolean,
    content: string,
    posted_on: Date,
    updated_at: Date,
  ) {}

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
