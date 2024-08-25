import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { db } from '../database/db';
import { validationResult } from 'express-validator';
import { asyncHandler } from '../util/asyncHandler';
import jwt from 'jsonwebtoken';

class UserController {
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, role } = req.body;

    try {
      await db.createUser(name, password, role);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Check if the error is a unique constraint violation
        if (error.code === 'P2002') {
          return res
            .status(409)
            .json({ message: 'A user with this name already exists.' });
        }
      } else {
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
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
    res.json({ data: user });
  });
}

class BlogController {
  createBlog = asyncHandler(async (req: Request, res: Response) => {
    // check if user exists
    const userId = req.params.id;
    const user = await db.getUserById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.json({ data: user });
  });

  getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    const { token } = req;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, async (error: any, authData: any) => {
      if (error) {
        res.sendStatus(403);
      } else {
        const allBlogs = await db.getAllBlogs();
        res.json({ data: allBlogs, authData });
      }
    });
  });

  getBlogWithComments = asyncHandler(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const blog = await db.getBlogWithComments(blogId);
    res.json({ data: blog });
  });
}

export const userController = new UserController();
export const blogController = new BlogController();
