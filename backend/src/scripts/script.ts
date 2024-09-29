import { PrismaClient, Roles, BlogTags } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

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

  // Create Alice user with hashed password
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      password: await hashPassword(process.env.ALICE_PASSWORD || 'defaultpw'),
      role: Roles.AUTHOR,
    },
  });

  // Create blog
  const blog = await prisma.blog.create({
    data: {
      title: 'Real Blog Example',
      tags: {
        set: [BlogTags.JavaScript, BlogTags.React, BlogTags.WebDevelopment, BlogTags.Frontend],
      },
      summary:
        'A comprehensive exploration of the latest technological advancements, industry disruptions, and future predictions.',
      is_published: true,
      content: {
        create: [
          {
            content: '<p><strong><span style="font-size: 24pt;">Alice\'s Tech Blog</span></strong></p>',
            order: 1,
          },
          {
            content:
              "<p>Welcome to <strong>Alice's Coding Corner</strong>, your ultimate destination for diving deep into the world of programming. Here, I aim to foster a vibrant community of learners and developers. Whether you're just embarking on your coding journey or you're a seasoned programmer seeking to sharpen your skills, you'll discover a wealth of resources, tips, and tutorials that cater to all levels of expertise. My goal is to make coding accessible, enjoyable, and rewarding for everyone.</p>",
            order: 2,
          },
          { content: '<p></p>', order: 3 }, // Empty space
          {
            content:
              '<p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCmJhOoenheL4Zq4vKcwN-eJ4O3VSsREEtIA&amp;s" alt="Coding Corner" width="225" height="225"></p>',
            order: 4,
          },
          { content: '<p></p>', order: 5 }, // Empty space
          {
            content: '<p><strong><span style="font-size: 18pt;">Getting Started with Variables</span></strong></p>',
            order: 6,
          },
          {
            content:
              "<p>Variables are the building blocks of programming. They allow you to store and manipulate data effectively. In this section, we'll delve into what variables are, the different types available, and how they function in various programming languages. We'll cover key concepts such as variable declaration, initialization, and scope. By understanding these principles, you'll be better equipped to write clean, efficient code. For example, in Python, variables are created simply by assigning a value, while in languages like Java, you must declare the type of variable before using it. Let's explore these differences and learn how to utilize variables in your coding projects.</p>",
            order: 7,
          },
          { content: '<p></p>', order: 8 }, // Empty space
          {
            content:
              "<p>In addition to variables, we'll also touch on best practices for <strong>naming your variables</strong>. Choosing meaningful names is crucial for maintaining readability and understanding in your code. A good variable name gives context about the data it holds and makes it easier for others (and your future self) to understand the purpose of your code at a glance. We'll share tips on how to adopt a consistent naming convention that will enhance your coding efficiency and promote better collaboration in team projects.</p>",
            order: 9,
          },
          { content: '<p></p>', order: 10 }, // Empty space
          {
            content: '<p><strong><span style="font-size: 18pt;">Understanding Data Types</span></strong></p>',
            order: 11,
          },
          {
            content:
              "<p>Data types are an essential concept in programming that determine what kind of data a variable can hold. In this section, we will explore various data types, including integers, floats, strings, and booleans. Each data type has its own unique properties and applications, which are crucial for effective programming. We'll also discuss type conversion and the importance of choosing the right data type for your variables to optimize performance and avoid errors.</p>",
            order: 12,
          },
          { content: '<p></p>', order: 13 }, // Empty space
          {
            content:
              '<p><strong><span style="font-size: 18pt;">Control Structures: Making Decisions in Code</span></strong></p>',
            order: 14,
          },
          {
            content:
              "<p>Control structures, such as <strong>if statements</strong>, <strong>loops</strong>, and <strong>switch cases</strong>, are fundamental for creating dynamic and responsive programs. We'll break down how these structures work and provide examples in different programming languages. You'll learn how to use control structures to direct the flow of your program based on certain conditions, making your code more versatile and powerful.</p>",
            order: 15,
          },
          { content: '<p></p>', order: 16 }, // Empty space
          {
            content: '<p><strong><span style="font-size: 18pt;">Functions: Organizing Your Code</span></strong></p>',
            order: 17,
          },
          {
            content:
              '<p><p><span style="text-decoration: underline;">Functions</span></p> are crucial for organizing code into reusable blocks. In this section, we will explore how to define and call functions, as well as the importance of parameters and return values. You\'ll discover how to create your own functions and how they can help improve code readability and maintainability. We\'ll also discuss the difference between built-in functions and user-defined functions, highlighting when and how to use each effectively.</p>',
            order: 18,
          },
          { content: '<p></p>', order: 19 }, // Empty space
          {
            content:
              '<p><strong><span style="font-size: 18pt;">Error Handling: Debugging Your Code</span></strong></p>',
            order: 20,
          },
          {
            content:
              '<p>Every programmer encounters errors, and knowing how to handle them is a vital skill. This section will cover common types of errors, such as <strong>syntax errors</strong>, <strong>runtime errors</strong>, and <strong>logical errors</strong>. We will discuss strategies for debugging your code effectively, including using debugging tools and writing test cases. Understanding how to troubleshoot issues will make you a more confident programmer.</p>',
            order: 21,
          },
          { content: '<p></p>', order: 22 }, // Empty space
          {
            content:
              '<p><strong><span style="font-size: 18pt;">Object-Oriented Programming: Understanding OOP Principles</span></strong></p>',
            order: 23,
          },
          {
            content:
              '<p>Object-oriented programming (OOP) is a paradigm that uses objects and classes to organize code. In this section, we will explore the four main principles of OOP: <strong>encapsulation</strong>, <strong>inheritance</strong>, <strong>polymorphism</strong>, and <strong>abstraction</strong>. You will learn how to leverage these principles to create scalable and maintainable applications. We will provide examples in popular OOP languages like Python and Java to illustrate how OOP can streamline your coding process.</p>',
            order: 24,
          },
          { content: '<p></p>', order: 25 }, // Empty space
          {
            content:
              '<p><strong><span style="font-size: 18pt;">Web Development Basics: HTML, CSS, and JavaScript</span></strong></p>',
            order: 26,
          },
          {
            content:
              "<p>In this section, we will introduce the fundamental technologies of web development: <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>. You'll learn how HTML structures web content, how CSS styles it, and how JavaScript adds interactivity. We will provide hands-on examples to help you build a simple web page from scratch, allowing you to apply what you learn in a practical context.</p>",
            order: 27,
          },
          { content: '<p></p>', order: 28 }, // Empty space
          {
            content:
              '<p><strong><span style="font-size: 18pt;">Best Practices in Coding: Writing Clean Code</span></strong></p>',
            order: 29,
          },
          {
            content:
              "<p>Writing clean, maintainable code is essential for successful programming. This section will discuss best practices for code organization, documentation, and version control. We'll emphasize the importance of writing code that is easy to read and understand, as well as how to use comments and documentation to clarify your intentions. We'll also cover version control systems like Git, which help you track changes and collaborate with others effectively.</p>",
            order: 30,
          },
          { content: '<p></p>', order: 31 }, // Empty space
        ],
      },
      users: {
        create: [{ user: { connect: { id: alice.id } } }],
      },
    },
  });

  // Add comments
  await prisma.comments.create({
    data: {
      blog: { connect: { id: blog.id } },
      text: 'Great first post, Alice! Looking forward to more content.',
      user: { connect: { id: alice.id } }, // Alice commenting on her own blog
      replies: {
        create: {
          blog: { connect: { id: blog.id } },
          text: 'Wow I replied to myself',
          user: { connect: { id: alice.id } },
          repliedToName: 'Alice',
        },
      },
    },
  });

  console.log('Added Alice as user with hashed password, one blog with content blocks, and two comments');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
