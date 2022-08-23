import IUser from '../../interfaces/IUser';

const userMock: IUser = {
  fullName: 'Jhon Daltrey',
  email: 'daltrey@email.com',
  password: 'hashed password',
  points: "1000",
  role: 'customer',
};

const userMockWithId: IUser = {
  id: 1,
  fullName: 'Jhon Daltrey',
  email: 'daltrey@email.com',
  password: 'hashed password',
  points: "1000",
  role: 'customer'
};

const userMockWithIdUpdated: IUser = {
  id: 1,
  fullName: 'Jhon Daltrey',
  email: 'daltrey@email.com',
  password: 'hashed password',
  points: "1800",
  role: 'customer'
};

export { userMock, userMockWithId, userMockWithIdUpdated };