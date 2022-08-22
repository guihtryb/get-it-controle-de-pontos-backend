import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;

  fullName: string;

  email: string;

  password?: string;

  role: string;

  points: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: STRING(255),
    allowNull: false,
  },
  email: {
    type: STRING(255),
    allowNull: false,
  },
  password: {
    type: STRING(255),
    allowNull: false,
  },
  role: {
    type: STRING(255),
    allowNull: false,
  },
  points: {
    type: DECIMAL(9, 2),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

export default Users;