import App from './App';
import LoginController from './controllers/LoginController';
import UsersController from './controllers/UsersController';
import IUser from './interfaces/IUser';
import LoginMiddleware from './middlewares/LoginMiddleware';
import UsersMiddleware from './middlewares/UsersMiddleware';
import CustomRouter from './routes/CustomRouter';
import LoginRouter from './routes/LoginRouter';

const server = new App();

const usersMiddleware = new UsersMiddleware();
const usersController = new UsersController();
const usersRouter = new CustomRouter<IUser>();

usersRouter.addRoutes(usersMiddleware, usersController);
server.addRouter(usersRouter.router);

const loginMiddleware = new LoginMiddleware();
const loginController = new LoginController();
const loginRouter = new LoginRouter();

loginRouter.addRoutes(loginMiddleware, loginController);
server.addRouter(loginRouter.router);

export default server;