import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { authentication } from '../../controllers/authentication.controller';
import { loginSchema } from '../../validations';

describe('authentication controller', () => {
  const user = { email: 'test@test.com', password: '123456' }
  const reqWithUser = {
    body: user
  } as unknown as Request;
  let resWithSpy: Response
  const next = () => {}

  beforeEach(() => {
    resWithSpy = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;
  })

  it('should should call loginSchema.parseAsync with req.body', async () => {
    loginSchema.parseAsync = vi.fn();
    await authentication(reqWithUser, resWithSpy, next);
    expect(loginSchema.parseAsync).toHaveBeenCalledWith(reqWithUser.body);
    vi.resetAllMocks();
  })
})