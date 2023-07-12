import { z } from 'zod';
import { userRepository } from '../../repositories';

// import inside controller to validate the incoming body
// export const registerSchema = z.object({
//   email: z
//     .string()
//     .min(1, { message: 'Email field is empty.' })
//     .email('This is not a valid email!')
//     .refine(async (e) => 
//       await userRepository.findOneBy({ email: e })      // checks if the email is already stored in the database
//         .then((data) => !data ? true : false),

//       { message: 'This email is already in use.' }
//     ),
//   password: z
//     .string()
//     .min(6, { message: 'The password must have at least 6 digits!' })
// });

// add type to the incoming request
// export type RegisterType = z.infer<typeof registerSchema>;

// use example
//
// function register(user: Register) {
//   const { email, password } = userSchema.parse(user);
//   console.log(email, password);
// }

// if validation is async use this
// async function register(user: Register) {
//   const { email, password } = await userSchema.parseAsync(user);
//   console.log(email, password);
// }
