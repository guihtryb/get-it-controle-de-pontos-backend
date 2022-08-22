import { Request, Response } from 'express';
import { ZodIssue } from 'zod';

import
IController,
{
  ControllerError,
  RequestWithBody,
  ResponseError,
} from '../interfaces/IController';

import IService from '../interfaces/IService';

enum ControllerErrors {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Not Found Entity With Such Id',
  CONFLICT = 'Entity Already Exists',
}

export default abstract class BaseController<T> implements IController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: IService<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  static createError = (issue: ZodIssue): ControllerError => ({
    path: issue.path ? [issue.path].toString() : undefined,
    message: issue.message,
  });

  getAll = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const items = await this.service.getAll();

      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  abstract getById(
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}
