import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { login } from '../../controllers/public/login.controller';
import { loginSchema } from '../../validations';
import { userRepository } from '../../repositories';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('login controller', () => {
  const userInRequest = { email: 'test@test.com', password: '123456' }
  const userStored = { id: 1, email: userInRequest.email, password_hash: 'thisisthehashpassword' }
  const reqWithUser = {
    body: userInRequest
  } as unknown as Request;
  const resWithSpy = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
    cookie: vi.fn()
  } as unknown as Response;
  const next = () => {}
  const tokenSigned = new Promise((res, rej) => res('tokenSigned'))

  beforeEach(() => {
    loginSchema.parseAsync = vi.fn().mockReturnValue(userInRequest);
    userRepository.findOneBy = vi.fn().mockReturnValue(userStored);
    bcrypt.compare = vi.fn().mockResolvedValue(true);
    jwt.sign = vi.fn().mockResolvedValue(tokenSigned);
  })

  it('should send a successful response if everything works fine', async () => {
    await login(reqWithUser, resWithSpy, next);
    // expects
    expect(loginSchema.parseAsync).toHaveBeenCalledWith(reqWithUser.body);
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: reqWithUser.body.email });
    expect(bcrypt.compare).toHaveBeenCalledOnce();
    expect(jwt.sign).toHaveBeenCalledWith({ email: userInRequest.email }, process.env.JWT_SECRET);
    expect(resWithSpy.cookie).toHaveBeenCalledWith('authToken', tokenSigned, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    expect(resWithSpy.status).toHaveBeenCalledWith(200);
    expect(resWithSpy.send).toHaveBeenCalledOnce();
    vi.resetAllMocks();
  })

  it('should throw an error if email is valid but user does not exist', async () => {
    userRepository.findOneBy = vi.fn().mockReturnValue(null);
    await expect(login(reqWithUser, resWithSpy, next)).rejects.toThrow();
    vi.resetAllMocks();
  })

  it('should throw an error if invalid password', async () => {
    bcrypt.compare = vi.fn().mockResolvedValue(false);
    await expect(login(reqWithUser, resWithSpy, next)).rejects.toThrow();
    vi.resetAllMocks();
  })
})