import { Router } from 'express';
import CustomMiddleware from '../middlewares/CustomMiddleware';
import LoginController from '../controllers/LoginController';
import { ILogin } from '../interfaces/ILogin';

export default class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(
    middleware: CustomMiddleware<ILogin>,
    controller: LoginController,
    route: string = controller.route,
  ) {
    this.router.post(route, middleware.verifyData, controller.create);
    this.router.get(route, controller.get);
  }
}

export const loginRouter = new LoginRouter();