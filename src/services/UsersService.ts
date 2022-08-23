import IUser from '../interfaces/IUser';
import IService from '../interfaces/IService';
import Users from '../database/models/Users';

export default class UsersService implements IService<IUser> {
  private _model;

  constructor() {
    this._model = Users;
  }

  async create(newUser: IUser): Promise<IUser | false> {
    const alreadyExists = await this._model
      .findOne({ where: { fullName: newUser.fullName, email: newUser.email } });

    if (alreadyExists) return false;

    await this._model.create(newUser);

    const user = await this._model
      .findOne({ 
        where: { fullName: newUser.fullName },
        attributes: { exclude: ['password'] } });

    if (!user) return false;

    return user;
  }

  async getById(id: number): Promise<IUser | null> {
    const user = await this._model
      .findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) return null;

    return user;
  }

  async getAll(): Promise<IUser[]> {
    const users = (await this._model
      .findAll({ attributes: { exclude: ['password'] } }));

    return users;
  }

  async update(id: number, userField: object): Promise<IUser | null> {
    const [key] = Object.keys(userField);
    const [value] = Object.values(userField);

    await this._model.update({ [key]: value }, { where: { id } });

    const userUpdated = await this.getById(id);

    return userUpdated;
  }

  async delete(id: number): Promise<IUser | null> {
    const userToDelete = await this.getById(id);

    if (!userToDelete) return null;

    await this._model.destroy({ where: { id } });

    return userToDelete;
  }
}

export const usersService = new UsersService();
