import { Prisma, Roles } from '@prisma/client';
import { Request, Response } from 'express';
import { db } from '../database/db';
import { asyncHandler } from '../util/asyncHandler';
import bcrypt from 'bcrypt';

import { checkValidationError } from '../util/checkValidationError';
import { AuthenticatedRequest } from './authController';

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

  searchBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { title } = req.body;
    console.log(title);
    if (!title) return res.status(404).json({ error: 'Not found' });

    const foundBlogs = await db.searchBlog(title);
    return res.json({ foundBlogs });
  });

  getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
    const allBlogs = await db.getAllBlogs();
    return res.json({ data: allBlogs });
  });

  getAllBlogsWithUsers = asyncHandler(async (req: Request, res: Response) => {
    const allBlogs = await db.getAllBlogsWithUser();
    return res.json({ data: allBlogs });
  });

  getAllBlogsFromUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const allBlogs = await db.getAllBlogsFromUser(userId);
    return res.json({ allBlogs });
  });

  getBlog = asyncHandler(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const blog = await db.getBlog(blogId);
    return res.json({ data: blog });
  });

  getBlogComments = asyncHandler(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const blogComments = await db.getBlogComments(blogId);
    return res.json({ blogComments });
  });

  createBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { user } = req;

    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (user.role !== 'AUTHOR') return res.status(401).json({ message: 'You are not allowed to create a Blog.' });
    if (checkValidationError(req, res)) return;

    const userId = user.id;
    const blog = await db.createBlog(userId);

    return res.json({ message: 'Blog created successfully', user, blog });
  });

  updateBlog = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as User | undefined;
    if (!user) return res.status(401).json({ message: 'You are not logged in!' });

    // check if blog exists and if user is author
    const blogId = req.params.id;
    if (!(await db.isInBlogAuthors(user.id, blogId))) return res.status(403).json({ error: 'Forbidden' });

    if (checkValidationError(req, res)) return;

    //  check if user is allowed to edit blog
    if (user.role !== 'AUTHOR') return res.status(403).json({ error: 'Access denied, you are not an author' });

    // update the blog
    const { title, summary, is_published, tags, updated_at, content } = req.body;
    await db.updateBlog(blogId, title, summary, JSON.parse(is_published), tags, updated_at, JSON.parse(content));

    return res.json({ message: 'Blog update successful' });
  });

  deleteBlog = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as User | undefined;
    if (!user) return res.status(401).json({ message: 'You are not logged in!' });

    const blogId = req.params.id;
    if (!(await db.isInBlogAuthors(user.id, blogId))) return res.status(403).json({ error: 'Forbidden' });

    await db.deleteBlog(blogId);

    return res.json({ message: 'Successfully deleted Blog' });
  });

  isAllowedToEdit = asyncHandler(async (req: Request, res: Response) => {
    const { userId, blogId } = req.params;
    const isAllowed = await db.isInBlogAuthors(userId, blogId);
    return res.json({ isAllowed });
  });
}

class CommentController {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY || '';
    if (!this.secretKey) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }
  }

  addComment = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as User;
    if (!user) return res.status(401).json({ message: 'You are not logged in!' });

    if (checkValidationError(req, res)) return;

    const blogId = req.params.id;
    const { text } = req.body;

    await db.addComment(user.id, blogId, text);

    return res.json({ success: true, message: 'Successfully created Comment' });
  });

  replyToComment = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as User;
    if (!user) return res.status(401).json({ message: 'You are not logged in' });
    console.log('Replied to comment');

    if (checkValidationError(req, res)) return;

    const blogId = req.params.id;
    const { text, parent_comment_id, replied_to_name } = req.body;

    try {
      await db.replyToComment(blogId, text, parent_comment_id, user.id, replied_to_name);
      return res.json({ success: true, message: 'Successfully replied to a comment' });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Check for the specific error code for foreign key constraint failure
        if (error.code === 'P2003') {
          return res.status(400).json({
            success: false,
            message: 'Failed to reply to comment due to invalid blogId or parent_comment_id',
          });
        }
      }
      return res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
      });
    }
  });
}

export const userController = new UserController();
export const blogController = new BlogController();
export const commentController = new CommentController();
