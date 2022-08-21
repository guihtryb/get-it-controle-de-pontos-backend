import { NextFunction, Request, Response } from 'express';
import { ZodIssue } from 'zod';
import loginSchema from '../interfaces/ILogin';

export default class LoginMiddleware {
  static createError = (issue: ZodIssue) => ({
    path: [issue.path].toString(),
    message: issue.message,
  });

  verifyLoginData = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const loginData = loginSchema.safeParse(body);

    if (!loginData.success) {
      const errors = loginData.error.issues.map(LoginMiddleware.createError);

      return res.status(400).json({ errors });
    }

    next();
  };
}