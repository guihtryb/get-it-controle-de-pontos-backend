import App from './App';
import UsersController from './controllers/UsersController';
import IUser from './interfaces/IUser';
import CustomRouter from './routes/CustomRouter';

const server = new App();

const usersController = new UsersController();
const usersRouter = new CustomRouter<IUser>();

usersRouter.addRoutes(usersController);

server.addRouter(usersRouter.router);

export default server;