import { Prisma, Roles } from '@prisma/client';
import { Request, Response } from 'express';
import { db } from '../database/db';
import { asyncHandler } from '../util/asyncHandler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { checkValidationError } from '../util/checkValidationError';
import { AuthenticatedRequest } from './authController';
import { safeParseBool } from '../util/safeConvertBool';

class UserController {
  createUser = asyncHandler(async (req: Request, res: Response) => {
    if (checkValidationError(req, res)) return;

    const { name, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.createUser(name, hashedPassword, role);
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Check if the user already exists
        if (error.code === 'P2002') {
          return res.status(409).json({ message: 'A user with this name already exists.' });
        }
      } else {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  });

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const allUsers = await db.getAllUsers();
    res.json({ data: allUsers });
  });

  getUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await db.getUserById(userId);
    return res.json({ data: user });
  });
}

interface User {
  id: string;
  name: string;
  role: Roles;
}

class BlogController {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY || '';
    if (!this.secretKey) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    this.getAllBlogs = this.getAllBlogs.bind(this);
    this.createBlog = this.createBlog.bind(this);
  }

  getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, this.secretKey, async (error: any, authData: any) => {
      if (error) {
        res.status(403).json({
          data: 'You are not logged in.',
        });
      } else {
        const allBlogs = await db.getAllBlogs();
        return res.json({ data: allBlogs, authData });
      }
    });
  });

  getBlogWithComments = asyncHandler(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const blog = await db.getBlogWithComments(blogId);
    return res.json({ data: blog });
  });

  createBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { user } = req;

    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (checkValidationError(req, res)) return;

    const { title, content, is_published } = req.body;

    const userId = user.id;
    const blog = await db.createBlog(userId, title, content, is_published);

    return res.json({ message: 'Blog created successfully', user, blog });
  });

  updateBlog = asyncHandler(async (req: Request, res: Response) => {
    if (checkValidationError(req, res)) return;

    const user = req.user as User | undefined;
    if (!user) return res.status(401).json({ message: 'You are not logged in!' });

    //  check if user is allowed to edit blog
    if (user.role !== 'AUTHOR') return res.status(403).json({ error: 'Access denied, you are not an author' });

    // check if blog exists and if user is author
    const blogId = req.params.id;
    if (!(await db.isInBlogAuthors(user.id, blogId))) return res.status(403).json({ error: 'Forbidden' });

    // update the blog
    const { title, is_published, content } = req.body;
    await db.updateBlog(blogId, title, safeParseBool(is_published), content);

    return res.json({ message: 'Blog update successful' });
  });
}

export const userController = new UserController();
export const blogController = new BlogController();
