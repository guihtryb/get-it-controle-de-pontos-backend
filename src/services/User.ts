import IUser, { userZodSchema } from '../interfaces/IUser';
import IService, { ServiceError } from '../interfaces/IService';
import Users from '../database/models/Users';

export default class UserService implements IService<IUser> {
  async create(newUser: IUser): Promise<IUser | ServiceError> {
    const parsed = userZodSchema.safeParse(newUser);

    return parsed.success ? Users.create(newUser) : { error: parsed.error }
  }

  async getById(id: number): Promise<IUser | boolean> {
    const user = await Users.findByPk(id);
    if (!user) return false;
    return user;
  }

  async getAll(): Promise<IUser[]> {
    return Users.findAll()
  }

  async update(id: number, points: number): Promise<IUser | boolean> {
    const userToUpdate = await this.getById(id);

    if (!userToUpdate) return false;

    await Users.update({ points }, { where: { id } });

    const userUpdated = await this.getById(id);

    return userUpdated;
  }

  async delete(id: number): Promise<IUser | boolean> {
    const userToDelete = await this.getById(id);

    if (!userToDelete) return false;

    await Users.destroy({ where: { id } });

    return userToDelete;
  }
}