import { describe, it, expect, vi } from 'vitest';
import { isAuthorized } from '../../../middlewares/authorization';
import { Request, Response } from 'express';

describe('is authorized middleware', () => {
  it('should call res.status passing 204 argument', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;
    isAuthorized({} as Request, res, () => {})
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  })

  vi.restoreAllMocks();
})