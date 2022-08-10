import { expect } from 'chai';
import * as sinon from 'sinon';
import { SafeParseError, SafeParseSuccess, ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import Users from '../../../database/models/Users';
import UserService from '../../../services/User';
import { userMock, userMockWithId, userMockWithIdUpdated } from '../../mocks/userMock';
import IUser, { userZodSchema } from '../../../interfaces/IUser';
import { zodError } from '../../mocks/zod';


describe('User Service', () => {
  const parseFailed: SafeParseError<IUser> = {
    success: false,
    error: zodError as unknown as ZodError,
  };

  const parseSucceed: SafeParseSuccess<IUser> = {
    success: true,
    data: userMockWithId,
  };

  beforeEach(sinon.restore);

  describe('When creating a user', () => {
    it('On Success', async () => {
      sinon.stub(Users, 'create').resolves(userMockWithId as unknown as Users);
      sinon.stub(userZodSchema, 'safeParse').returns(parseSucceed);

      const userService = new UserService();

      const userCreated = await userService.create(userMock);

      expect(userCreated).to.be.deep.equal(userMockWithId);
    });
    it('On Failure', async () => {
      sinon.stub(userZodSchema, 'safeParse').returns(parseFailed);

      const userService = new UserService();

      const userCreated = await userService.create(userMock);

      expect(userCreated).to.be.deep.equal({ error: parseFailed.error });
    });
  });
  describe('When getting all users', () => {
    it('On Success', async () => {
      sinon.stub(Users, 'findAll').resolves([userMockWithId] as unknown as Users[]);

      const userService = new UserService();

      const allUsers = await userService.getAll();

      expect(allUsers).to.be.deep.equal([userMockWithId]);
    });
  });
  describe('When getting a user by id', () => {
    it('On Success', async () => {
      sinon.stub(Users, 'findByPk').resolves(userMockWithId as unknown as Users);

      const userService = new UserService();

      const user = await userService.getById(1);

      expect(user).to.be.deep.equal(userMockWithId);
    });
    it('On Failure', async () => {
      sinon.stub(Users, 'findByPk').resolves(userMockWithId as unknown as Users);

      const userService = new UserService();

      const user = await userService.getById(1);

      expect(user).to.be.deep.equal(userMockWithId);
    });
  });
  describe('When updating an user`s points', () => {
    it('On Success', async () => {
      sinon.stub(Users, 'findByPk')
        .onCall(0).resolves(userMockWithId as unknown as Users)
        .onCall(1).resolves(userMockWithIdUpdated as unknown as Users);
      sinon.stub(Users, 'update').resolves([1]);

      const userService = new UserService();

      const user = await userService.update(1, 1800);

      expect(user).to.be.deep.equal(userMockWithIdUpdated);
    });
    it('On Failure', async () => {
      sinon.stub(Users, 'findByPk').resolves(null);

      const userService = new UserService();

      const user = await userService.update(4, 1800);

      expect(user).to.be.equal(false);
    });
  });
  describe('When deleting an user', () => {
    it('On Success', async () => {
      sinon.stub(Users, 'findByPk').resolves(userMockWithId as unknown as Users)
      sinon.stub(Users, 'destroy').resolves();

      const userService = new UserService();

      const user = await userService.delete(1);

      expect(user).to.be.deep.equal(userMockWithId);
    });
    it('On Failure', async () => {
      sinon.stub(Users, 'findByPk').resolves(null);

      const userService = new UserService();

      const user = await userService.delete(1);

      expect(user).to.be.equal(false);
    });
  });
});