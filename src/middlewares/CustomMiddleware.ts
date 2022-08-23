import { z, ZodIssue, ZodRawShape } from 'zod';
import { NextFunction, Response } from 'express';
import { RequestWithBody } from '../interfaces/IController';

export default class CustomMiddleware<T> {
  private _zodObject: z.ZodObject<ZodRawShape>;
  
  constructor(
    zodObject: z.ZodObject<ZodRawShape>,
  ) {
    this._zodObject = zodObject;
  }

  static createError = (issue: ZodIssue) => ({
    path: [issue.path].toString(),
    message: issue.message,
  });

  verifyData = (
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction,
  ): typeof res | undefined => {
    const { body } = req;

    const data = this._zodObject.safeParse(body);

    if (!data.success) {
      const errors = data.error.issues.map(CustomMiddleware.createError);

      return res.status(400).json({ errors });
    }
    next();
  };

  verifyUpdateField = (
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction,
  ) => {
    const { body } = req;

    const [bodyKey] = Object.keys(body);

    const data = this._zodObject.keyof().Values;

    const isFieldCorrect = bodyKey in data;

    if (!isFieldCorrect) {
      return res.status(400)
        .json({ message: `Invalid Field Named: '${bodyKey}'` });
    }
    next();
  };
}