import { Response, NextFunction } from 'express';
import { RequestWithBody } from '../interfaces/IController';
import IUser, { userZodSchema } from '../interfaces/IUser';
import CustomMiddleware from './CustomMiddleware';

export default class UsersMiddleware extends CustomMiddleware<IUser> {
  verifyData = (
    req: RequestWithBody<IUser>,
    res: Response,
    next: NextFunction,
  ) => {
    const { body } = req;

    const userData = userZodSchema.safeParse(body);

    if (!userData.success) {
      const errors = userData.error.issues.map(CustomMiddleware.createError);

      return res.status(400).json({ errors });
    }
    next();
  };
}