import { Request, Response, NextFunction } from 'express';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('authToken');
    res.status(204).send();
  } catch (err) {
    res.status(500).send();
  }
}