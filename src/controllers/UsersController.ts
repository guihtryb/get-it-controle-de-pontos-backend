import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import { usersService } from '../services/UsersService';
import { RequestWithBody, ResponseError } from '../interfaces/IController';
import BaseController from './BaseController';

export default class UsersController extends BaseController<IUser> {
  private _route: string;

  constructor(
    service = usersService,
    route = '/users',
  ) {
    super(service);
    this._route = route;
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestWithBody<IUser>,
    res: Response<IUser | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      if (!body.password) {
        return res.status(400).json({ message: 'Password is required' });
      }

      const newUser = await this.service.create(body);

      if (!newUser) {
        return res.status(409).json({ message: this.errors.CONFLICT });
      }

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  getById = async (
    req: Request,
    res: Response<IUser | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const parsedId = +id;

      const user = await this.service.getById(parsedId);

      if (!user) {
        return res.status(404)
          .json({ message: this.errors.NOT_FOUND });
      } 

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  update = async (
    req: Request,
    res: Response<IUser | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const { id } = req.params;

    try {
      const parsedId = +id;

      const user = await this.service.update(parsedId, body);

      if (!user) {
        return res.status(404).json({ message: this.errors.NOT_FOUND });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  delete = async (
    req: Request,
    res: Response<IUser | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const parsedId = +id;

      const user = await this.service.delete(parsedId);

      if (!user) {
        return res.status(404).json({ message: this.errors.NOT_FOUND });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };
}

export const usersController = new UsersController();
