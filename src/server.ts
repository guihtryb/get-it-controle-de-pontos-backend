import App from './App';
import { usersController } from './controllers/UsersController';
import CustomMiddleware from './middlewares/CustomMiddleware';
import { loginController } from './controllers/LoginController';
import IUser, { userZodSchema } from './interfaces/IUser';
import CustomRouter from './routes/CustomRouter';
import { loginRouter } from './routes/LoginRouter';
import loginSchema, { ILogin } from './interfaces/ILogin';
import IProduct, { productZodSchema } from './interfaces/IProduct';
import { productsController } from './controllers/ProductsController';
import saleSchema, { ISale } from './interfaces/ISale';
import { salesController } from './controllers/SalesController';

const server = new App();

const usersMiddleware = new CustomMiddleware<IUser>(userZodSchema);
const usersRouter = new CustomRouter<IUser>();

usersRouter.addRoutes(usersMiddleware, usersController);
server.addRouter(usersRouter.router);

const loginMiddleware = new CustomMiddleware<ILogin>(loginSchema);

loginRouter.addRoutes(loginMiddleware, loginController);
server.addRouter(loginRouter.router);

const productsMiddleware = new CustomMiddleware<IProduct>(productZodSchema);
const productsRouter = new CustomRouter<IProduct>();

productsRouter.addRoutes(productsMiddleware, productsController);
server.addRouter(productsRouter.router);

const salesMiddleware = new CustomMiddleware<ISale>(saleSchema);
const salesRouter = new CustomRouter<ISale>();

salesRouter.addRoutes(salesMiddleware, salesController);
server.addRouter(salesRouter.router);

export default server;