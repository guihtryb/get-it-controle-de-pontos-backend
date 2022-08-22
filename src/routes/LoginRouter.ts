import { Router } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginController from '../controllers/LoginController';

export default class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(
    middleware: LoginMiddleware,
    controller: LoginController,
    route: string = controller.route,
  ) {
    this.router.post(route, middleware.verifyData, controller.create);
    this.router.get(route, controller.get);
  }
}

export const loginRouter = new LoginRouter();