import { NextFunction, Request, Response } from 'express';
import loginSchema, { ILogin } from '../interfaces/ILogin';
import CustomMiddleware from './CustomMiddleware';

export default class LoginMiddleware extends CustomMiddleware<ILogin> {
  verifyData = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const loginData = loginSchema.safeParse(body);

    if (!loginData.success) {
      const errors = loginData.error.issues.map(CustomMiddleware.createError);

      return res.status(400).json({ errors });
    }
    next();
  };
}