import { describe, it, expect, vi, beforeAll } from 'vitest';
import { ZodObject, ZodError } from 'zod';
import { userRepository } from '../../repositories';
import { registerSchema, RegisterType } from '../../validations/register.validation';

describe('register validation', () => {
  const testRegister = async (user: RegisterType) => await registerSchema.parseAsync(user);
  
  describe('existent user', () => {
    const user = { email: 'stored@test.com', password: '123456' };
    beforeAll(() => userRepository.findOneBy = vi.fn().mockResolvedValue(user));

    it('should throw a zod error if email is already stored', async () => {
      await expect(testRegister(user)).rejects.toBeInstanceOf(ZodError);
      await expect(testRegister(user)).rejects.toThrow('This email is already in use');
    })
  })

  describe('new user', () => {
    beforeAll(() => userRepository.findOneBy = vi.fn().mockResolvedValue(null));
  
    it('should pass validation if email is not stored and password length >= 6', async () => {
      const user = { email: 'new@test.com', password: '123456' };
      await testRegister(user);
      expect(registerSchema).toBeInstanceOf(ZodObject);
    });
    
    it('should throw a zod error if password length < 6', async () => {
      const user = { email: 'new@test.com', password: '12345' };
      await expect(testRegister(user)).rejects.toBeInstanceOf(ZodError);
      await expect(testRegister(user)).rejects.toThrow('The password must have at least 6 digits');
    });
  
    it('should throw a zod error if no email', async () => {
      const user = { email: '', password: '123456' };
      await expect(testRegister(user)).rejects.toBeInstanceOf(ZodError);
      await expect(testRegister(user)).rejects.toThrow('Email field is empty');
    })
  
    it('should throw a zod error if invalid email', async () => {
      const user = { email: 'new@.com', password: '123456' }
      await expect(testRegister(user)).rejects.toBeInstanceOf(ZodError);
      await expect(testRegister(user)).rejects.toThrow('This is not a valid email');
    })
  })
})