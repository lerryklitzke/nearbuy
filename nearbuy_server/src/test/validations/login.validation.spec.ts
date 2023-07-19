import { describe, it, expect } from 'vitest';
import { ZodObject, ZodError } from 'zod';
import { loginSchema, LoginType } from '../../validations';

describe('login validation', () => {
  const testLogin = async (user: LoginType) => loginSchema.parseAsync(user);
    
  it('should return a zod object if valid email and password length >= 6', async () => {
    const user = { email: 'login@test.com', password: '123456' };
    await testLogin(user);
    expect(loginSchema).toBeInstanceOf(ZodObject);
  })

  it('should return a zod error if password length < 6', async () => {
    const user = { email: 'login@test.com', password: '12345' };
    await expect(testLogin(user)).rejects.toBeInstanceOf(ZodError);
    await expect(testLogin(user)).rejects.toThrow('Password must have at least 6 digists');
  })

  it('should return a zod error if no email', async () => {
    const user = { email: '', password: '123456' };
    await expect(testLogin(user)).rejects.toBeInstanceOf(ZodError);
    await expect(testLogin(user)).rejects.toThrow('Email field is empty')
  })

  it('should return a zod error if invalid email', async () => {
    const user = { email: 'login@.com', password: '123456' };
    await expect(testLogin(user)).rejects.toBeInstanceOf(ZodError);
    await expect(testLogin(user)).rejects.toThrow('This is not a valid email')
  })
})