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

  const showCaseAuthor = await prisma.user.create({
    data: {
      name: 'Showcase Author',
      password: await hashPassword(process.env.SHOWCASE_PASSWORD || 'defaultpw'),
      role: Roles.AUTHOR,
    },
  });

  await prisma.user.create({
    data: {
      name: 'Guest',
      password: await hashPassword('guest'),
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

  // Create showcase blog
  await prisma.blog.create({
    data: {
      title: 'Feature Showcase',
      tags: [BlogTags.WebDevelopment, BlogTags.FullStack],
      summary: 'A showcase of the Text editor: Format, style, and enrich content with colors, media, and more tools!',
      content: {
        create: [
          {
            content: '<p><strong><span style="font-size: 24pt;">Header</span></strong></p>',
            order: 1,
          },
          {
            content:
              '<p>Creating a <strong>header</strong> is really easy to do: make the text bold and font size to 24pt.</p>',
            order: 2,
          },
          { content: '<p></p>', order: 3 }, // Empty space
          {
            content:
              '<p><strong><span style="font-size: 18pt;"><span style="color: #e03e2d;">Co</span><span style="color: #e67e23;">lo</span><span style="color: #f1c40f;">re</span><span style="color: #2dc26b;">d</span> <span style="color: #3598db;">Te</span><span style="color: #236fa1;">xt</span><span style="color: #b96ad9;">!</span></span></strong></p>',
            order: 4,
          },
          {
            content: '<p>Colored Text is really easy to add</p>',
            order: 5,
          },
          { content: '<p></p>', order: 6 }, // Empty space
          {
            content:
              '<p style="text-align: center;"><strong><span style="font-size: 18pt;">Different Text positions</span></strong></p>',
            order: 7,
          },
          {
            content: '<p style="text-align: left;">Left</p>',
            order: 8,
          },
          {
            content: '<p style="text-align: right;">Right</p>',
            order: 9,
          },
          { content: '<p></p>', order: 10 }, // Empty space
          {
            content: '<p><strong><span style="font-size: 18pt;">Marking Text</span></strong></p>',
            order: 11,
          },
          {
            content:
              '<p><span style="text-decoration: underline;"><s><em><strong>This sentence is bold, italic, underlined, and striketrough</strong></em></s></span></p>',
            order: 12,
          },
          { content: '<p></p>', order: 13 }, // Empty space
          {
            content: '<p><strong><span style="font-size: 18pt;">Images</span></strong></p>',
            order: 14,
          },
          {
            content:
              '<p><img src="data:image/webp;base64,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"></p>',
            order: 15,
          },
          { content: '<p></p>', order: 16 }, // Empty space
          { content: '<p><strong><span style="font-size: 18pt;">Gifs</span></strong></p>', order: 17 },
          {
            content:
              '<p><img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzJxbG4xdWl4YjdlNWdoa3ZjbjdkczR5MGJyNjFkYW8zc21renR5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.webp"></p>',
            order: 18,
          },
          { content: '<p></p>', order: 19 }, // Empty space
          { content: '<p><strong><span style="font-size: 18pt;">Tables</span></strong></p>', order: 20 },
          {
            content:
              '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.205374%;"><col style="width: 33.205374%;"><col style="width: 33.205374%;"></colgroup> <tbody> <tr> <td>This</td> <td>Is</td> <td>A&nbsp;</td> </tr> <tr> <td>Table</td> <td>Or</td> <td>Is</td> </tr> <tr> <td>It</td> <td>Not</td> <td>?</td> </tr> </tbody> </table>',
            order: 21,
          },
        ],
      },
      users: {
        create: [{ user: { connect: { id: showCaseAuthor.id } } }],
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
