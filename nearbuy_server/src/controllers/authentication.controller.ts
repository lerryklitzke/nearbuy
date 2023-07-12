import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginSchema, LoginType } from '../middlewares/validations/login.validation';
import { userRepository } from '../repositories';
import { User } from '../entity/user.entity';

export const authentication = async (req: Request<{}, {}, LoginType>, res: Response, next: NextFunction): Promise<NextFunction | void> => {
  try {
    const user: LoginType = req.body;
    const { email, password } = await loginSchema.parseAsync(user);  // zod making validation 

    const userData: User | null = await userRepository.findOneBy({ email });

    if (userData) {
      const { password_hash } = userData;
      const validPassword: boolean = await compare(password, password_hash);

      if (validPassword) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        
        res.cookie('authToken', token, { 
          httpOnly: true,
          maxAge: 1000 * 60 * 60 
        });
        res.status(200).send('Logged in successfully!');
      }
    }

  } catch (err) {
    res.status(403).send(err)
  }
}