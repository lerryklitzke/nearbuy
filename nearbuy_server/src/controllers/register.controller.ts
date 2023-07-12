import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { registerSchema, RegisterType } from '../middlewares/validations/register.validation';
import { User } from '../entity/user.entity';
import { userRepository } from '../repositories';

export const register = async (req: Request<{}, {}, RegisterType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: RegisterType = req.body;
    const { email, password } = await registerSchema.parseAsync(user);  // zod making validation 
    const password_hash: string = await hash(password, 12);

    const newUser: User = new User();
    newUser.email = email;
    newUser.password_hash = password_hash;
    await userRepository.save(newUser);

    res.status(200).send('User successfully created!');

  } catch (err: any) {
    res.status(400).send(err);
  }
}