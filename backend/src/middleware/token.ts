import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ? remove error from req.token
import 'express';
declare module 'express' {
  export interface Request {
    token?: string;
  }
}
interface jwtRequest extends Request {
  authData?: any;
}

class Token {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY || '';
    if (!this.secretKey) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    this.verify = this.verify.bind(this);
  }

  extract(req: Request, res: Response, next: NextFunction) {
    // get authorization header value
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const [, token] = bearer;
      // set the token
      req.token = token;
      next();
    } else {
      res.sendStatus(403);
    }
  }

  verify(req: jwtRequest, res: Response, next: NextFunction) {
    const { token } = req;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, this.secretKey, (error: Error | null, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        req.user = authData;
        next();
      }
    });
  }
}

const token = new Token();
export default token;
