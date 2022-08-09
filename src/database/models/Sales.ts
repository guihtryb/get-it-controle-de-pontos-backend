import { DATE } from 'sequelize';
import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';
import Users from './Users';

class Sales extends Model {
  id!: number;
  userId: number;
  sellerId: number;
  totalPrice: number;
  totalPoints: number;
  deliveryAddress: string;
  saleDate: Date;
  status: string;
}

Sales.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'users'
    }
  },
  sellerId: {
    type: INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'users'
    }
  },
  totalPrice: {
    type: DECIMAL(9, 2),
    allowNull: false,
  },
  totalPoints: {
    type: DECIMAL(9, 2),
    allowNull: false,
  },
  deliveryAddress: {
    type: STRING(255),
    allowNull: false,
  },
  deliveryNumber: {
    type: STRING(255),
    allowNull: false,
  },
  saleDate: {
    type: DATE,
    allowNull: false,
  },
  status: {
    type: STRING(100),
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Sales',
  timestamps: false
});

Sales.belongsTo(Users, { foreignKey: 'id', as: 'userId' });
Sales.belongsTo(Users, { foreignKey: 'id', as: 'sellerId' });

Users.hasMany(Sales, { foreignKey: 'id', as: 'userId'});
Users.hasMany(Sales, { foreignKey: 'id', as: 'sellerId'});

export default Sales;