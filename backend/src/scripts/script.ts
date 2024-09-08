import { PrismaClient, Roles, ContentTypes } from '@prisma/client';
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
  await prisma.contentBlock.deleteMany({});
  await prisma.userBlogs.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('All existing records deleted.');

  // Create 10 users with hashed passwords
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
    prisma.user.create({
      data: {
        name: 'Frank',
        password: await hashPassword('fr@nk303'),
        role: Roles.BASIC,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Grace',
        password: await hashPassword('gr@ce404'),
        role: Roles.AUTHOR,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Henry',
        password: await hashPassword('h3nry505'),
        role: Roles.AUTHOR,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Isabelle',
        password: await hashPassword('1s@belle606'),
        role: Roles.BASIC,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jack',
        password: await hashPassword('j@ck707'),
        role: Roles.AUTHOR,
      },
    }),
  ]);

  // Create blogs with content blocks
  const blogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: 'Tech Trends Collaborative',
        summary:
          'A comprehensive exploration of the latest technological advancements, industry disruptions, and future predictions.',
        is_published: true,
        content: {
          create: [
            {
              type: ContentTypes.header,
              content: 'Introduction to Tech Trends',
              order: 1,
            },
            {
              type: ContentTypes.text,
              content:
                "In this collaborative blog, we explore the cutting-edge developments shaping our technological landscape. From artificial intelligence to quantum computing, we'll delve into the innovations that are set to transform industries and society as we know it.",
              order: 2,
            },
            {
              type: ContentTypes.image,
              content: 'https://cdn-icons-png.flaticon.com/512/7134/7134618.png',
              order: 3,
            },
            {
              type: ContentTypes.header,
              content: 'Artificial Intelligence and Machine Learning',
              order: 4,
            },
            {
              type: ContentTypes.text,
              content:
                "AI and ML are revolutionizing industries across the board. We'll examine their current applications, potential future uses, and the ethical considerations that come with these powerful technologies.",
              order: 5,
            },
          ],
        },
        users: {
          create: [
            { user: { connect: { id: users[0].id } } }, // Alice
            { user: { connect: { id: users[4].id } } }, // Eva
            { user: { connect: { id: users[7].id } } }, // Henry
          ],
        },
      },
    }),
    prisma.blog.create({
      data: {
        title: "Charlie's Coding Corner",
        summary: 'A comprehensive blog for coding enthusiasts of all levels.',
        is_published: true,
        content: {
          create: [
            {
              type: ContentTypes.header,
              content: 'Welcome to Coding Corner',
              order: 1,
            },
            {
              type: ContentTypes.text,
              content:
                "This blog is designed to be your go-to resource for all things coding. Whether you're a beginner just starting out or an experienced developer looking to refine your skills, you'll find valuable insights here.",
              order: 2,
            },
            {
              type: ContentTypes.image,
              content: 'https://cdn-icons-png.flaticon.com/512/2621/2621040.png',
              order: 3,
            },
            {
              type: ContentTypes.header,
              content: 'Getting Started with Variables',
              order: 4,
            },
            {
              type: ContentTypes.text,
              content:
                "Variables are fundamental to programming. Let's explore how they work and why they're so important in writing efficient and effective code.",
              order: 5,
            },
          ],
        },
        users: { create: { user: { connect: { id: users[2].id } } } },
      },
    }),
    prisma.blog.create({
      data: {
        title: 'The Blockchain Revolution',
        summary: 'Exploring the transformative power of blockchain technology across industries.',
        is_published: true,
        content: {
          create: [
            {
              type: ContentTypes.header,
              content: 'Understanding Blockchain',
              order: 1,
            },
            {
              type: ContentTypes.text,
              content:
                "Blockchain is more than just the foundation of cryptocurrencies. It's a revolutionary technology with the potential to transform various sectors, from finance to supply chain management.",
              order: 2,
            },
            {
              type: ContentTypes.image,
              content: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCmJhOoenheL4Zq4vKcwN-eJ4O3VSsREEtIA&s',
              order: 3,
            },
            {
              type: ContentTypes.header,
              content: 'Real-world Applications',
              order: 4,
            },
            {
              type: ContentTypes.text,
              content:
                "From supply chain management to voting systems, blockchain is finding diverse applications. We'll explore some of the most promising use cases and their potential impact.",
              order: 5,
            },
          ],
        },
        users: { create: { user: { connect: { id: users[0].id } } } }, // Alice
      },
    }),
  ]);

  // Add comments, including replies
  await Promise.all([
    prisma.comments.create({
      data: {
        text: 'This collaborative post is incredibly insightful! The diverse perspectives really enrich the content.',
        user: { connect: { id: users[1].id } },
        blog: { connect: { id: blogs[0].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: 'Charlie, your coding tutorials are always so clear and easy to follow. Thank you!',
        user: { connect: { id: users[3].id } },
        blog: { connect: { id: blogs[1].id } },
      },
    }),
    // Add a comment with a reply
    prisma.comments.create({
      data: {
        text: 'The section on AI ethics is particularly thought-provoking.',
        user: { connect: { id: users[5].id } },
        blog: { connect: { id: blogs[0].id } },
        replies: {
          create: [
            {
              text: 'I agree! The ethical considerations of AI are crucial to discuss.',
              user: { connect: { id: users[7].id } },
              blog: { connect: { id: blogs[0].id } },
            },
          ],
        },
      },
    }),
    prisma.comments.create({
      data: {
        text: 'This blockchain explanation is very clear. I finally understand the basics!',
        user: { connect: { id: users[8].id } },
        blog: { connect: { id: blogs[2].id } },
      },
    }),
  ]);

  console.log('Added users with hashed passwords, blogs with content blocks, and comments with replies');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
