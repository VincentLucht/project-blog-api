import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Roles } from '@prisma/client';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import { checkValidationError } from '../util/checkValidationError';

const prisma = new PrismaClient();

type User = {
  id: string;
  name: string;
  password: string;
  role: Roles;
};

export interface AuthenticatedRequest extends Request {
  user?: User;
  title?: string;
}

class AuthController {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY || '';
    if (!this.secretKey) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    // ? bind this. and setup passport.js
    this.logIn = this.logIn.bind(this);
    this.authenticateJwt = this.authenticateJwt.bind(this);
    this.setupPassport();
  }

  private setupPassport() {
    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secretKey,
    };

    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: jwt_payload.id },
          });

          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      }),
    );
  }

  async logIn(req: Request, res: Response) {
    // get user from db, compare plain word pw to hashed pw and sign the user in
    if (checkValidationError(req, res)) return;

    try {
      const user = await prisma.user.findUnique({
        where: { name: req.body.name },
      });

      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const payload = { id: user.id, name: user.name, role: user.role };
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '14 days' });
        return res.json({ success: true, token: `Bearer ${token}` });
      } else {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  }

  authenticateJwt(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (error: any, user: User | false | null) => {
      if (error) return next(error);

      if (!user) return res.status(401).json({ message: 'Unauthorized' });

      (req as AuthenticatedRequest).user = user;
      next();
    })(req, res, next);
  }
}

const authController = new AuthController();
export default authController;
