import { ZodIssue } from 'zod';
import { NextFunction, Response } from 'express';
import { RequestWithBody } from '../interfaces/IController';

export default abstract class CustomMiddleware<T> {
  static createError = (issue: ZodIssue) => ({
    path: [issue.path].toString(),
    message: issue.message,
  });

  abstract verifyData(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction
  ): typeof res | undefined;
}