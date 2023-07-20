import { describe, it, expect, vi } from 'vitest';
import { register } from '../../controllers/register.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { registerSchema } from '../../validations';
import { userRepository } from '../../repositories';
import { User } from '../../entity/user.entity';

describe('register controller', () => {
  const user = { email: 'test@test.com', password: '123456' }
  const passwordHash = '123456_hash'
  const newUser = new User();
  newUser.email = user.email;
  newUser.password_hash = passwordHash;
  const userSaved = { email: user.email, password: passwordHash }
  const reqWithUser = {
    body: user
  } as unknown as Request;
  const resWithSpy = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn()
  } as unknown as Response;
  const next = () => {}

  it('should send a successful response if everything works fine', async () => {
    registerSchema.parseAsync = vi.fn().mockReturnValue(user);
    bcrypt.hash = vi.fn().mockReturnValue(passwordHash);
    userRepository.save = vi.fn().mockReturnValue(userSaved);
    await register(reqWithUser, resWithSpy, next);
    expect(registerSchema.parseAsync).toHaveBeenCalledWith(user);
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
    expect(userRepository.save).toHaveBeenCalledWith(newUser);
    expect(resWithSpy.status).toHaveBeenCalledWith(200);
    expect(resWithSpy.send).toHaveBeenCalledOnce();
    vi.resetAllMocks();
  })
})