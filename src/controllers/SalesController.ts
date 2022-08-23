import { Request, Response } from 'express';
import { salesService } from '../services/SalesService';
import { RequestWithBody, ResponseError } from '../interfaces/IController';
import BaseController from './BaseController';
import { ISale } from '../interfaces/ISale';

export default class SalesController extends BaseController<ISale> {
  private _route: string;

  constructor(
    service = salesService,
    route = '/sales',
  ) {
    super(service);
    this._route = route;
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestWithBody<ISale>,
    res: Response<ISale | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const newSale = await this.service.create(body);

      if (!newSale) {
        return res.status(409).json({ message: 'Missing Products' });
      }

      return res.status(201).json(newSale);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  getById = async (
    req: Request,
    res: Response<ISale | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const parsedId = +id;

      const sale = await this.service.getById(parsedId);

      if (!sale) {
        return res.status(404)
          .json({ message: this.errors.NOT_FOUND });
      } 

      return res.status(200).json(sale);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  update = async (
    req: Request,
    res: Response<ISale | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const { id } = req.params;

    try {
      const parsedId = +id;

      const sale = await this.service.update(parsedId, body);

      if (!sale) {
        return res.status(404).json({ message: this.errors.NOT_FOUND });
      }

      return res.status(200).json(sale);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  delete = async (
    req: Request,
    res: Response<ISale | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const parsedId = +id;

      const sale = await this.service.delete(parsedId);

      if (!sale) {
        return res.status(404).json({ message: this.errors.NOT_FOUND });
      }

      return res.status(200).json(sale);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };
}

export const salesController = new SalesController();
