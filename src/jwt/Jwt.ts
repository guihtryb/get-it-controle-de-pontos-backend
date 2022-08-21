import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import { IUserTokenData } from '../interfaces/IUser';

export default class Jwt {
  private _secret: string;

  constructor() {
    this._secret = readFileSync('jwt.evaluation.key', {
      encoding: 'utf8',
    });
  }

  createToken = (userData: IUserTokenData) => jwt.sign(
    { data: userData },
    this._secret,
    {
      expiresIn: '5d',
      algorithm: 'HS256',
    },
  );

  verifyToken = (token: string) =>
    jwt.verify(token, this._secret);
}