import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class AuthController {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY || '';
    if (!this.secretKey) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    // bind login to secretKey
    this.logIn = this.logIn.bind(this);
  }

  logIn(req: Request, res: Response) {
    // 1st
    const user = {
      id: 1,
      username: 'Brad',
      email: 'brad@gmail.com',
    };

    // 2nd
    jwt.sign(
      { user },
      this.secretKey,
      { expiresIn: '60s' }, // ? optional expire date
      (error: Error | null, token: string | undefined) => {
        if (error) {
          res.status(500).json({ error: 'Failed to generate token.' });
        } else {
          res.json({ token });
        }
      },
    );
  }
}

const authController = new AuthController();
export default authController;
