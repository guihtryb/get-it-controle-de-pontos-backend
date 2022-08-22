import { Router } from 'express';
import CustomMiddleware from '../middlewares/CustomMiddleware';
import BaseController from '../controllers/BaseController';

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(
    middleware: CustomMiddleware<T>,
    controller: BaseController<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.getAll);
    this.router.get(`${route}/:id`, controller.getById);
    this.router.post(route, middleware.verifyData, controller.create);
    this.router.put(`${route}/:id`, middleware.verifyData, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}