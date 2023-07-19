import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { tokenValidation } from '../../../middlewares/authorization';
import { Request, Response, NextFunction } from 'express';

describe('token validation middleware', () => {
  const reqWithCookies = {
    cookies: { authToken: 'token' }
  } as unknown as Request;
  const next: NextFunction = () => {};

  // token exist
  it('should call jwt.verify() if auth token exists', () => {
    jwt.verify = vi.fn().mockResolvedValue(null);
    tokenValidation(reqWithCookies, {} as Response, next);
    expect(jwt.verify).toHaveBeenCalledWith(reqWithCookies.cookies.authToken, process.env.JWT_SECRET);
    vi.resetAllMocks();
  })

  // token is valid
  it('should call next function if tokenDecoded is exists', () => {
    jwt.verify = vi.fn().mockReturnValue(true);
    const nextWithSpy = vi.fn();
    tokenValidation(reqWithCookies, {} as Response, nextWithSpy)
    expect(nextWithSpy).toHaveBeenCalledOnce();
    vi.resetAllMocks();
  })
  
  describe('when throws an error', () => {
    let resWithSpy: Response;

    beforeEach(() => {
      resWithSpy = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn().mockReturnThis()
      } as unknown as Response;
    });

    // token doesn't exist
    it('should call res.status() passing 403 argument and send if no auth token', () => {
      const reqWithoutToken = {
        cookies: {}
      } as unknown as Request;
      tokenValidation(reqWithoutToken, resWithSpy, next)
      expect(resWithSpy.status).toHaveBeenCalledWith(403);
      expect(resWithSpy.send).toHaveBeenCalledOnce();
      vi.resetAllMocks();
    })

    // token is invalid
    it('should call res.status() passing 403 argument and send if invalid auth token', () => {
      jwt.verify = vi.fn().mockReturnValue(undefined);
      tokenValidation(reqWithCookies, resWithSpy, next);
      expect(resWithSpy.status).toHaveBeenCalledWith(403);
      expect(resWithSpy.send).toHaveBeenCalledOnce();
      vi.resetAllMocks()
    })
  })
})