import { Router } from 'express';
import LoginController from '../controllers/LoginController';

export default class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(
    controller: LoginController,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
  }
}