import IUser, { userZodSchema } from '../interfaces/IUser';
import IService, { ServiceError } from '../interfaces/IService';
import Users from '../database/models/Users';

export default class UsersService implements IService<IUser> {
  private _model;

  constructor() {
    this._model = Users;
  }

  async create(newUser: IUser): Promise<IUser | ServiceError> {
    const parsed = userZodSchema.safeParse(newUser);

    return (parsed.success ? this._model.create(newUser)
      : { error: parsed.error });
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

    const userToUpdate = await this.getById(id);

    if (!userToUpdate) return null;

    await Users.update({ user }, { where: { id: parsedId } });

    const userUpdated = await this.getById(id);

    return userUpdated;
  }

  async delete(id: string): Promise<IUser | null> {
    const userToDelete = await this.getById(id);

    if (!userToDelete) return null;

    const parsedId = +id;

    await Users.destroy({ where: { id: parsedId } });

    return userToDelete;
  }
}

export const usersService = new UsersService();
