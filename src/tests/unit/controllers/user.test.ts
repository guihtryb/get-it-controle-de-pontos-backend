import * as sinon from 'sinon';
const chai = require('chai');
const chaiHttp = require('chai-http');
import UserController from '../../../controllers/usersController';
import { usersService } from '../../../services/usersService';
import { userMock } from '../../mocks/userMock';
import { Request, Response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing User Controller', () => {

  beforeEach(sinon.restore);

  describe('Creating a new user', () => {
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(usersService, 'create').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });

    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(usersService, 'create').resolves(userMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userMock)).to.be.true;
    });
  });
  describe('When getting all users', () => {
    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(usersService, 'getAll').resolves([userMock]);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.getAll(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([userMock])).to.be.true;
    });
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(usersService, 'getAll').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.getAll(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
  });
  describe('When getting an user by it`s id', () => {
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: "2" };

      sinon.stub(usersService, 'getById').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.getById(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '1' };
      sinon.stub(usersService, 'getById').resolves(userMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.getById(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userMock)).to.be.true;
    });
  });
  describe('When updating an user', () => {
    it('On Failure', async () => {
      const req = { body: { points: 900 } } as Request;
      const res = {} as Response;
      req.params = { id: "2" };

      sinon.stub(usersService, 'update').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
    it('On Success', async () => {
      const req = { body: { points: 900 } } as Request;
      const res = {} as Response;
      req.params = { id: '1' };

      sinon.stub(usersService, 'update').resolves(userMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userMock)).to.be.true;
    });
  });
  describe('When deleting an user', () => {
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: "2" };

      sinon.stub(usersService, 'delete').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.delete(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '1' };

      sinon.stub(usersService, 'delete').resolves(userMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const userController = new UserController();
      await userController.delete(req, res)

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userMock)).to.be.true;
    });
  });
});