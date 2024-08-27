import { PrismaClient, Roles } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  // Delete all existing table content
  console.log('Deleting existing records...');
  await prisma.comments.deleteMany({});
  await prisma.userBlogs.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('All existing records deleted.');

  // Create 5 users with hashed passwords
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice',
        password: await hashPassword('pass123'),
        role: Roles.AUTHOR,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob',
        password: await hashPassword('secure456'),
        role: Roles.BASIC,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Charlie',
        password: await hashPassword('ch@rlie789'),
        role: Roles.AUTHOR,
      },
    }),
    prisma.user.create({
      data: {
        name: 'David',
        password: await hashPassword('d@vid101'),
        role: Roles.BASIC,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Eva',
        password: await hashPassword('ev@202'),
        role: Roles.AUTHOR,
      },
    }),
  ]);

  // The rest of your code remains the same
  // Create blogs for authors
  const blogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: "Alice's Tech Blog",
        content: 'This is a blog about the latest in tech.',
        is_published: true,
        users: { create: { user: { connect: { id: users[0].id } } } },
      },
    }),
    prisma.blog.create({
      data: {
        title: "Charlie's Coding Corner",
        content: 'Tips and tricks for coding beginners.',
        is_published: true,
        users: { create: { user: { connect: { id: users[2].id } } } },
      },
    }),
    prisma.blog.create({
      data: {
        title: "Eva's Tech Insights",
        content: 'Analyzing trends in the tech industry.',
        is_published: false,
        users: { create: { user: { connect: { id: users[4].id } } } },
      },
    }),
  ]);

  // Add comments
  await Promise.all([
    prisma.comments.create({
      data: {
        text: 'Great post, Alice!',
        user: { connect: { id: users[1].id } },
        blog: { connect: { id: blogs[0].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: 'I learned a lot from this, Charlie.',
        user: { connect: { id: users[3].id } },
        blog: { connect: { id: blogs[1].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: 'Looking forward to more content!',
        user: { connect: { id: users[1].id } },
        blog: { connect: { id: blogs[1].id } },
      },
    }),
  ]);

  console.log('Added users with hashed passwords, blogs, and comments');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
