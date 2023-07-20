import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { authentication } from '../../controllers/authentication.controller';
import { loginSchema } from '../../validations';
import { userRepository } from '../../repositories';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('authentication controller', () => {
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

  it('should call res.status with 200 and send', async () => {
    loginSchema.parseAsync = vi.fn().mockReturnValue(userInRequest);
    userRepository.findOneBy = vi.fn().mockReturnValue(userStored);
    bcrypt.compare = vi.fn().mockResolvedValue(true);
    jwt.sign = vi.fn().mockResolvedValue(tokenSigned);
    await authentication(reqWithUser, resWithSpy, next);
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
})