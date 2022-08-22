import IUser from '../interfaces/IUser';
import IService from '../interfaces/IService';
import Users from '../database/models/Users';

export default class UsersService implements IService<IUser> {
  private _model;

  constructor() {
    this._model = Users;
  }

  async create(newUser: IUser): Promise<IUser | false> {
    console.log(newUser);
    const alreadyExists = await this._model
      .findOne({ where: { fullName: newUser.fullName, email: newUser.email } });
    console.log(alreadyExists);
    
    if (alreadyExists) return false;
    
    return this._model.create(newUser);
  }

  static excludeUserPassword(user: IUser): IUser {
    const userInfos = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      points: user.points,
    };

    return userInfos;
  }

  async getById(id: string): Promise<IUser | null> {
    const parsedId = +id;

    const user = await this._model.findByPk(parsedId);

    if (!user) return null;

    const userInfos = UsersService.excludeUserPassword(user);

    return userInfos;
  }

  async getAll(): Promise<IUser[]> {
    const users = (await this._model.findAll())
      .map(UsersService.excludeUserPassword);

    return users;
  }

  async update(id: string, user: IUser): Promise<IUser | null> {
    const parsedId = +id;

    await this._model.update(user, { where: { id: parsedId } });

    const userUpdated = await this.getById(id);

    return userUpdated;
  }

  async delete(id: string): Promise<IUser | null> {
    const userToDelete = await this.getById(id);

    if (!userToDelete) return null;

    const parsedId = +id;

    await this._model.destroy({ where: { id: parsedId } });

    return userToDelete;
  }
}

export const usersService = new UsersService();
