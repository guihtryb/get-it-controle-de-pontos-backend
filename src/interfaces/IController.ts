import { Request, Response } from 'express';

type ErrorMessage = {
  message: string;
};

export type ControllerError = {
  path?: string;
  message: string;
};

type BadRequestErrors = {
  errors: ControllerError[],
};

export type ResponseError = BadRequestErrors | ErrorMessage;

export interface RequestWithBody<T> extends Request {
  body: T;
}

export default interface IController<T> {
  create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  getAll(
    req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res>;

  getById(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  delete(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}