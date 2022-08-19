import IUser, { userZodSchema } from '../interfaces/IUser';
import IService, { ServiceError } from '../interfaces/IService';
import Users from '../database/models/Users';

export default class UsersService implements IService<IUser> {
  async create(newUser: IUser): Promise<IUser | ServiceError> {
    const parsed = userZodSchema.safeParse(newUser);

    return parsed.success ? Users.create(newUser) : { error: parsed.error }
  }

  async getById(id: string): Promise<IUser | null> {
    const parsedId = +id;

    const user = await Users.findByPk(parsedId);

    if (!user) return null;

    return user;
  }

  async getAll(): Promise<IUser[]> {
    return Users.findAll()
  }

  async update(id: string, points: number): Promise<IUser | null> {
    const parsedId = +id;

    const userToUpdate = await this.getById(id);

    if (!userToUpdate) return null;

    await Users.update({ points }, { where: { id: parsedId } });

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
