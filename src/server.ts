import App from './App';
import { usersController } from './controllers/UsersController';
import { usersMiddleware } from './middlewares/UsersMiddleware';
import { loginController } from './controllers/LoginController';
import IUser from './interfaces/IUser';
import { loginMiddleware } from './middlewares/LoginMiddleware';
import CustomRouter from './routes/CustomRouter';
import { loginRouter } from './routes/LoginRouter';

const server = new App();

const usersRouter = new CustomRouter<IUser>();

usersRouter.addRoutes(usersMiddleware, usersController);
server.addRouter(usersRouter.router);

loginRouter.addRoutes(loginMiddleware, loginController);
server.addRouter(loginRouter.router);

export default server;