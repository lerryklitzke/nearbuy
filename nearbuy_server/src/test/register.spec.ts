import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { register } from '../controllers/register.controller';

describe('register route', () => {
  it('should send a zod error if no email', async () => {
    let error: any;
    const req = {
      body: {
        password: '123123'
      }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn((data) => error = data)
    } as unknown as Response;
    const next = () => {}
    await register(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(error instanceof ZodError).toBe(true);
  })

  it('should send an error if no password', async () => {
    const req = {
      body: {
        email: 'test@test.com'
      }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;
    const next = () => {};
    await register(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith(expect.any(Error));
  })

  it('should send a zod error if password length < 6', async () => {
    let error: any;
    const req = {
      body: {
        password: '123'
      }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn((data) => error = data)
    } as unknown as Response;
    const next = () => {}
    await register(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(error instanceof ZodError).toBe(true);
  })
})