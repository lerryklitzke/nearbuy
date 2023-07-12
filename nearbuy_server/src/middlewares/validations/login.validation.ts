import { z } from 'zod';
import { userRepository } from '../../repositories';

const errorMessage = 'Invalid email of password.'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email field is empty.' })
    .email('This is not a valid email!')
    .refine(async (e) => 
      await userRepository.findOneBy({ email: e })
        .then((data) => data ? true : false),

      { message: errorMessage }
    ),
  password: z
    .string()
    .min(6, { message: errorMessage })
});

export type LoginType = z.infer<typeof loginSchema>;