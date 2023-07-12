import { z } from 'zod';
import { userRepository } from '../../repositories';

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email field is empty.' })
    .email('This is not a valid email!')
    .refine(async (e) => 
      await userRepository.findOneBy({ email: e })
        .then((data) => !data ? true : false),

      { message: 'This email is already in use.' }
    ),
  password: z
    .string()
    .min(6, { message: 'The password must have at least 6 digits!' })
});

export type RegisterType = z.infer<typeof registerSchema>;

