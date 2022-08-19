import { Request, Response } from 'express';

import
Controller,
{
  RequestWithBody,
  ResponseError,
} from '../interfaces/IController';

import IService from '../interfaces/IService';

enum ControllerErrors {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Entity Not Found With Such Id',
  BAD_REQUEST = 'Invalid Data Format',
}

export default abstract class BaseController<T> implements Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: IService<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  getAll = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const items = await this.service.getAll();

      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({
        error: this.errors.INTERNAL,
      });
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