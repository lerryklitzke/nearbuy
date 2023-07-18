import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ZodObject } from 'zod';
import { userRepository } from '../repositories';
import { registerSchema } from '../middlewares/validations/register.validation';

describe('register validation with zod', () => {
  it('should pass validation if email is not stored', async () => {
    userRepository.findOneBy = vi.fn().mockResolvedValue(null);
    const user = {
      email: 'test@test.com',
      password: '123456'
    };
    await registerSchema.parseAsync(user);
    expect(userRepository.findOneBy).toBeCalled()
    expect(registerSchema instanceof ZodObject).toBe(true);
  })
})