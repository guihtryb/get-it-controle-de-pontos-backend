import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestWithBody } from '../interfaces/IController';
import Jwt from '../jwt/Jwt';
import LoginService from '../services/LoginService';

export default class LoginController {
  private _route: string;

  private _service: LoginService;

  private _jwt: Jwt;
 
  constructor(
    route = '/login',
    loginService = new LoginService(),
    jwt = new Jwt(),
  ) {
    this._route = route;
    this._service = loginService;
    this._jwt = jwt;
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestWithBody<{ email: string, password: string }>,
    res: Response,
  ) => {
    const { email, password } = req.body;
    try {
      const user = await this._service.create(email, password);

      if (!user) {
        return res.status(401)
          .json({ message: 'Incorrect Email or Password.' });
      }

      const userToken = this._jwt.createToken(user);

      return res.status(200).json({ user, token: userToken });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  get = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    try {
      if (!authorization) {
        return res.status(401).json({ message: 'Token Not Found' });
      }

      const { data: { id, role } } = this._jwt
        .verifyToken(authorization) as JwtPayload;

      return res.status(200).json({ id, role });
    } catch {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  };
}