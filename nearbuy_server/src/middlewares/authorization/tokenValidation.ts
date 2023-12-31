import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const tokenValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token: string | null = req.cookies.authToken;
    if (token) {
      const tokenDecoded: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenDecoded) {
        next();
      } else {
        throw new Error('Invalid token.');
      }
    } else {
      throw new Error('Token not found.');
    }
  } catch (err) {
    res.status(403).send(err);
  }
}