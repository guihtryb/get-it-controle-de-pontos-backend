import { Request, Response } from 'express';
import IProduct from '../interfaces/IProduct';
import { productsService } from '../services/ProductsService';
import { RequestWithBody, ResponseError } from '../interfaces/IController';
import BaseController from './BaseController';

export default class ProductsController extends BaseController<IProduct> {
  private _route: string;

  constructor(
    service = productsService,
    route = '/products',
  ) {
    super(service);
    this._route = route;
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestWithBody<IProduct>,
    res: Response<IProduct | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const newProduct = await this.service.create(body);

      if (!newProduct) {
        return res.status(409).json({ message: this.errors.CONFLICT });
      }
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  getById = async (
    req: Request,
    res: Response<IProduct | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const product = await this.service.getById(id);

      if (!product) {
        return res.status(404)
          .json({ message: this.errors.NOT_FOUND });
      } 

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  update = async (
    req: Request,
    res: Response<IProduct | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const { id } = req.params;

    try {
      const product = await this.service.update(id, body);

      if (!product) {
        return res.status(404).json({ message: this.errors.NOT_FOUND });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };

  delete = async (
    req: Request,
    res: Response<IProduct | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const product = await this.service.delete(id);

      if (!product) {
        return res.status(404).json({ message: this.errors.NOT_FOUND });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: this.errors.INTERNAL });
    }
  };
}

export const productsController = new ProductsController();
