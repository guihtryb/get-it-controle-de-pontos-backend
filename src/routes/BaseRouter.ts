import { Router } from "express";
import BaseController from "../controllers/BaseController";

export default abstract class CustomRouter<T> {
  public router: Router;

  constructor(
    ) {
      this.router = Router()
  }

  public addRoutes(
    controller: BaseController<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.getAll)
    this.router.get(`${route}/:id`, controller.getById)
    this.router.post(route, controller.create)
    this.router.put(`${route}/:id`, controller.update)
    this.router.delete(`${route}/:id`, controller.delete)
  }
}