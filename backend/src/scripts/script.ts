import { PrismaClient, Roles } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 5 users
  const users = await Promise.all([
    prisma.user.create({
      data: { name: 'Alice', password: 'pass123', role: Roles.AUTHOR },
    }),
    prisma.user.create({
      data: { name: 'Bob', password: 'secure456', role: Roles.BASIC },
    }),
    prisma.user.create({
      data: { name: 'Charlie', password: 'ch@rlie789', role: Roles.AUTHOR },
    }),
    prisma.user.create({
      data: { name: 'David', password: 'd@vid101', role: Roles.BASIC },
    }),
    prisma.user.create({
      data: { name: 'Eva', password: 'ev@202', role: Roles.AUTHOR },
    }),
  ]);

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

  console.log('Added users, blogs, and comments');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
