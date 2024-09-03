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

  // Create blogs, including some with multiple authors
  const blogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: 'Tech Trends Collaborative',
        summary:
          'A comprehensive exploration of the latest technological advancements, industry disruptions, and future predictions. This collaborative blog brings together insights from multiple tech experts.',
        content:
          'This is an extensive collaborative blog about the latest in tech, written by multiple authors. It covers topics ranging from artificial intelligence and machine learning to blockchain, IoT, and beyond. Each section delves deep into the subject matter, providing readers with both theoretical knowledge and practical applications.',
        is_published: true,
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
        summary:
          'A comprehensive blog for coding enthusiasts of all levels. From beginner-friendly tutorials to advanced techniques, this blog covers a wide range of programming topics.',
        content:
          "Welcome to Charlie's Coding Corner! This blog is designed to be your go-to resource for all things coding. We'll start with the basics, covering fundamental concepts like variables, loops, and functions. As we progress, we'll dive into more complex topics such as object-oriented programming, design patterns, and algorithm optimization. Whether you're just starting out or looking to refine your skills, you'll find valuable insights here.",
        is_published: true,
        users: { create: { user: { connect: { id: users[2].id } } } },
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Design & Development Digest',
        summary:
          'An in-depth exploration of the relationship between design and development in tech. This blog examines how these disciplines intersect and influence each other.',
        content:
          "In the ever-evolving world of technology, the line between design and development is increasingly blurred. This blog serves as a comprehensive guide to navigating this intersection. We'll explore topics such as user experience (UX) design, front-end development techniques, responsive design principles, and how to effectively collaborate in cross-functional teams. Our goal is to foster a deeper understanding between designers and developers, ultimately leading to more cohesive and user-friendly digital products.",
        is_published: true,
        users: {
          create: [
            { user: { connect: { id: users[2].id } } }, // Charlie
            { user: { connect: { id: users[6].id } } }, // Grace
          ],
        },
      },
    }),
    prisma.blog.create({
      data: {
        title: "Charlie's Advanced Coding",
        summary:
          'Delve into advanced programming techniques, architectural patterns, and cutting-edge technologies. For experienced developers looking to enhance their skills.',
        content:
          "Welcome to the advanced coding section! Here, we'll explore complex topics that challenge even seasoned developers. We'll dive deep into subjects like concurrent programming, distributed systems, microservices architecture, and advanced algorithms. Each post will include detailed explanations, code samples, and real-world applications to help you grasp these advanced concepts and apply them in your projects.",
        is_published: true,
        users: { create: { user: { connect: { id: users[2].id } } } },
      },
    }),
    prisma.blog.create({
      data: {
        title: "Eva's Unpublished Tech Article",
        summary:
          'A sneak peek into an upcoming technological breakthrough. This article provides an exclusive, in-depth analysis of the technology and its potential impact.',
        content:
          "This article offers a comprehensive look at a groundbreaking technology that's still under wraps. We'll explore its underlying principles, potential use cases across various industries, and the challenges that need to be overcome before widespread adoption. While we can't reveal all the details yet, this piece will give you a solid understanding of how this innovation could shape our technological landscape in the coming years.",
        is_published: false,
        users: { create: { user: { connect: { id: users[4].id } } } },
      },
    }),
    prisma.blog.create({
      data: {
        title: 'The Future of AI in Healthcare',
        summary:
          'An examination of how artificial intelligence is transforming healthcare. From diagnosis and treatment to drug discovery and personalized medicine.',
        content:
          "Artificial Intelligence is rapidly changing the face of healthcare. In this comprehensive blog post, we delve into the various applications of AI in the medical field. We'll discuss how machine learning algorithms are improving diagnostic accuracy, how AI-powered robots are assisting in surgeries, and how deep learning is accelerating drug discovery. We'll also explore the ethical considerations and potential challenges of integrating AI into healthcare systems.",
        is_published: true,
        users: { create: { user: { connect: { id: users[9].id } } } }, // Jack
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Sustainable Tech: Building a Greener Future',
        summary:
          'A deep dive into sustainable technology and its role in combating climate change. Exploring green tech solutions, from renewable energy to eco-friendly design.',
        content:
          "As the world grapples with the challenges of climate change, the tech industry has a crucial role to play in building a sustainable future. This blog post examines the latest advancements in green technology and their potential impact on our planet. We'll explore topics such as solar and wind energy innovations, energy-efficient computing, sustainable data centers, and the circular economy in tech manufacturing.",
        is_published: true,
        users: {
          create: [
            { user: { connect: { id: users[0].id } } }, // Alice
            { user: { connect: { id: users[7].id } } }, // Henry
          ],
        },
      },
    }),
  ]);

  // Add comments
  await Promise.all([
    prisma.comments.create({
      data: {
        text: 'This collaborative post is incredibly insightful! The diverse perspectives from different authors really enrich the content. I particularly enjoyed the section on emerging AI technologies and their potential impact on various industries.',
        user: { connect: { id: users[1].id } },
        blog: { connect: { id: blogs[0].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: "Charlie, your coding tutorials are always so clear and easy to follow. I've been struggling with understanding recursion for a while, but your explanation and examples in this post finally made it click for me. Thank you!",
        user: { connect: { id: users[3].id } },
        blog: { connect: { id: blogs[1].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: 'The way this blog bridges the gap between design and development is fantastic! As a designer, I often struggle to communicate effectively with developers, but the insights shared here have given me a much better understanding of the development process.',
        user: { connect: { id: users[1].id } },
        blog: { connect: { id: blogs[2].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: "Charlie and Grace, your collaboration on this piece is truly impressive. The balance between design principles and technical implementation is spot on. I've already started applying some of these ideas in my current project!",
        user: { connect: { id: users[5].id } },
        blog: { connect: { id: blogs[2].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: "This deep dive into advanced coding techniques is exactly what I've been looking for! The section on optimizing algorithms for big data processing was particularly enlightening. Looking forward to more content like this!",
        user: { connect: { id: users[8].id } }, // Isabelle
        blog: { connect: { id: blogs[3].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: 'Jack, your analysis of AI in healthcare is both comprehensive and thought-provoking. I work in medical research, and I can attest to the rapid changes AI is bringing to our field. Your insights on the ethical considerations are particularly valuable.',
        user: { connect: { id: users[4].id } }, // Eva
        blog: { connect: { id: blogs[5].id } },
      },
    }),
    prisma.comments.create({
      data: {
        text: "This blog on sustainable tech is a must-read for anyone in the industry. I appreciate how you've not only highlighted the innovations but also discussed the challenges in implementing these solutions at scale. Great work, Alice and Henry!",
        user: { connect: { id: users[2].id } }, // Charlie
        blog: { connect: { id: blogs[6].id } },
      },
    }),
  ]);

  console.log(
    'Added users with hashed passwords, blogs (including multi-author blogs) with extended summaries, and more detailed comments',
  );

  // Additional Blogs
  const moreBlogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: 'The Blockchain Revolution',
        summary:
          'Exploring the transformative power of blockchain technology across industries. From finance to supply chain, this blog uncovers the potential and challenges of this decentralized ledger technology.',
        content:
          "Blockchain is more than just the foundation of cryptocurrencies. It's a disruptive technology that's poised to change various sectors. In this blog, we explore blockchain's applications in finance, supply chain management, healthcare, and beyond. We'll discuss the technology's underlying principles, real-world use cases, and the challenges that need to be addressed for widespread adoption. Whether you're new to blockchain or looking to deepen your understanding, this blog has something for you.",
        is_published: true,
        users: { create: { user: { connect: { id: users[0].id } } } }, // Alice
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Cybersecurity Essentials',
        summary:
          'A comprehensive guide to the fundamentals of cybersecurity. Protect yourself and your organization from digital threats with these expert insights and practical tips.',
        content:
          "In today's digital world, cybersecurity is more critical than ever. This blog covers the essentials you need to know to safeguard your personal data and your organization's assets. We'll explore topics like encryption, firewalls, phishing, and ransomware, along with best practices for securing your online presence. Whether you're a tech novice or an IT professional, you'll find valuable information here to help you stay safe online.",
        is_published: true,
        users: { create: { user: { connect: { id: users[1].id } } } }, // Bob
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Data Science for Everyone',
        summary:
          'An accessible introduction to data science. Learn how to harness the power of data to make informed decisions, regardless of your technical background.',
        content:
          "Data science is revolutionizing how we approach problem-solving across industries. This blog is designed to make data science approachable for everyone, regardless of your technical expertise. We'll cover the basics of data analysis, machine learning, and statistical modeling, using real-world examples to illustrate key concepts. By the end of this series, you'll have a solid foundation to start using data science in your own work.",
        is_published: true,
        users: { create: { user: { connect: { id: users[4].id } } } }, // Eva
      },
    }),
    prisma.blog.create({
      data: {
        title: 'The Art of Remote Work',
        summary:
          'Strategies and tips for thriving in a remote work environment. From productivity hacks to work-life balance, this blog offers insights for remote workers and managers alike.',
        content:
          "Remote work is here to stay, and thriving in this new environment requires new strategies. In this blog, we'll explore how to stay productive, maintain work-life balance, and foster collaboration in a remote setting. We'll also discuss the tools and technologies that can make remote work more efficient, as well as tips for managers on how to lead distributed teams effectively. Whether you're a seasoned remote worker or new to the concept, this blog has something for you.",
        is_published: true,
        users: { create: { user: { connect: { id: users[5].id } } } }, // Frank
      },
    }),
    prisma.blog.create({
      data: {
        title: 'AI in Everyday Life',
        summary:
          'Discover how artificial intelligence is becoming a part of our daily routines. This blog explores AI-powered tools and technologies that are already making a difference in our lives.',
        content:
          "Artificial Intelligence is no longer just a concept of the future—it's here, and it's transforming our everyday lives. In this blog, we'll explore the AI technologies that are already impacting how we live and work. From virtual assistants and personalized recommendations to smart homes and autonomous vehicles, we'll delve into the practical applications of AI that you might not even realize you're using. We'll also discuss the ethical considerations and challenges that come with integrating AI into daily life.",
        is_published: true,
        users: { create: { user: { connect: { id: users[6].id } } } }, // Grace
      },
    }),
    prisma.blog.create({
      data: {
        title: 'The Ethics of AI',
        summary:
          'A deep dive into the ethical considerations surrounding artificial intelligence. Explore the implications of AI on privacy, bias, and the future of work.',
        content:
          "As AI continues to evolve, so do the ethical questions it raises. This blog is dedicated to exploring the moral and societal implications of artificial intelligence. We'll discuss issues such as data privacy, algorithmic bias, and the impact of AI on employment. We'll also consider the role of regulation and governance in ensuring that AI is developed and used responsibly. Join us as we navigate the complex ethical landscape of this transformative technology.",
        is_published: true,
        users: {
          create: [
            { user: { connect: { id: users[2].id } } }, // Charlie
            { user: { connect: { id: users[9].id } } }, // Jack
          ],
        },
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Healthy Living in a Digital Age',
        summary:
          'Balancing technology use with physical and mental well-being. Tips and strategies for maintaining a healthy lifestyle while staying connected.',
        content:
          "In an increasingly digital world, it's more important than ever to prioritize our health. This blog explores how we can use technology to support, rather than hinder, our well-being. We'll discuss topics such as digital detoxes, the impact of screen time on sleep, and using apps to track and improve physical fitness. You'll also find strategies for maintaining mental health in the age of social media and constant connectivity. Let's find a balance between staying plugged in and living a healthy, fulfilling life.",
        is_published: true,
        users: {
          create: [
            { user: { connect: { id: users[3].id } } }, // David
            { user: { connect: { id: users[7].id } } }, // Henry
          ],
        },
      },
    }),
    prisma.blog.create({
      data: {
        title: 'From Idea to App: The Development Journey',
        summary:
          'Follow the process of turning a simple idea into a fully functional app. This blog covers the entire development lifecycle, from concept to deployment.',
        content:
          "Building an app is a complex process that requires careful planning and execution. In this blog, we'll take you through the entire development journey, from the initial idea to the final product. We'll cover key steps such as market research, prototyping, coding, testing, and deployment. Along the way, we'll share tips and best practices to help you avoid common pitfalls and ensure your app's success. Whether you're a developer, designer, or entrepreneur, you'll find valuable insights here.",
        is_published: true,
        users: { create: { user: { connect: { id: users[8].id } } } }, // Isabelle
      },
    }),
    prisma.blog.create({
      data: {
        title: 'The Future of Work',
        summary:
          'Exploring how technology is reshaping the workplace. From automation and AI to remote work, this blog examines the trends and challenges that will define the future of work.',
        content:
          "The workplace is evolving rapidly, driven by advances in technology and changes in societal expectations. This blog explores the key trends that are shaping the future of work, including automation, artificial intelligence, and the rise of remote work. We'll discuss the opportunities and challenges that these changes bring, and how businesses and employees can adapt to stay competitive. Whether you're a business leader, HR professional, or employee, this blog will help you navigate the changing landscape of work.",
        is_published: true,
        users: {
          create: [
            { user: { connect: { id: users[0].id } } }, // Alice
            { user: { connect: { id: users[5].id } } }, // Frank
          ],
        },
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Quantum Computing: A New Era',
        summary:
          'An introduction to quantum computing and its potential to revolutionize industries. Learn about the basic principles, current developments, and future applications.',
        content:
          "Quantum computing represents a paradigm shift in how we approach complex problem-solving. In this blog, we'll introduce you to the fundamental concepts of quantum computing, including qubits, entanglement, and superposition. We'll also explore the current state of quantum computing research and its potential applications in fields such as cryptography, materials science, and artificial intelligence. While quantum computing is still in its early stages, its potential to revolutionize industries is immense, and this blog will help you understand why.",
        is_published: true,
        users: { create: { user: { connect: { id: users[9].id } } } }, // Jack
      },
    }),
  ]);

  console.log('Added more blogs with diverse topics and detailed content');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
