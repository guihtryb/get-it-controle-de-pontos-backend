import Bcrypt from '../bcrypt/Bcrypt';
import Users from '../database/models/Users';

export default class LoginService {
  private _model;

  private _bcrypt: Bcrypt;

  constructor() {
    this._model = Users;
    this._bcrypt = new Bcrypt();
  }

  async create(email: string, password: string) {
    const user = await this._model.findOne({ where: { email } });

    if (!user) return false;

    const dbPassword = user.password as string;

    const passwordMatchCorrectly = await this._bcrypt
      .compare(password, dbPassword);

    if (!passwordMatchCorrectly) return false;

    const userInfos = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return userInfos;
  }
}