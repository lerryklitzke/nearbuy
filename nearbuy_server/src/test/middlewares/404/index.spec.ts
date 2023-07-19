import { describe, it, expect, vi } from 'vitest';
import { notFound } from '../../../middlewares/404';
import { Request, Response } from 'express';

describe('404 middleware', () => {
  it('should call res.status() passing 404 argument', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;
    notFound({} as Request, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Not Found.');
  })

  vi.restoreAllMocks();
})