import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email field is empty.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(6, { message: 'Password must have at least 6 digists.' })
});

export type LoginType = z.infer<typeof loginSchema>;