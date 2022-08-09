import { Model, INTEGER } from 'sequelize';
import db from '.';
import Products from './Products';
import Sales from './Sales';

class SalesProducts extends Model {
  productId: number;
  saleId: number;
  quantity: number;
}

SalesProducts.init({
  productId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  saleId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'SalesProducts',
  timestamps: false
});

Sales.belongsToMany(Products, { through: SalesProducts, as: 'products', foreignKey: 'saleId'});

Products.belongsToMany(Sales, { through: SalesProducts, as: 'sales', foreignKey: 'productId'});

export default SalesProducts;

