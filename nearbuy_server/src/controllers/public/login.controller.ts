import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginSchema, LoginType } from '../../validations';
import { userRepository } from '../../repositories';
import { User } from '../../entity/user.entity';

export const login = async (req: Request<{}, {}, LoginType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: LoginType = req.body;
    const { email, password } = await loginSchema.parseAsync(user);  // zod making validation 
    const userData: User | null = await userRepository.findOneBy({ email });
    const { password_hash } = userData!;
    const validPassword: boolean = await bcrypt.compare(password, password_hash);
    if (validPassword) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.cookie('authToken', token, { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 
      });
      res.status(200).send('Successful login!');
    } else {
      throw new Error();
    }

  } catch (err) {
    res.status(401).send('Invalid email or password.');
  }
}